var training;
var currentIndex = 0;
var currentOperation = undefined;

var timeOutId;
var intervalId;
var secondsPerOperation = 10;
var timeLeft = secondsPerOperation;

function startTraining() {
  var arrayTablesNumber = [];

  for(var i = 2; i <= 9; i++) {
    if(document.getElementById(i).checked) {
      arrayTablesNumber.push(i);
    }
  } 
  
  training = new Training(arrayTablesNumber);

  document.getElementById("tables").style = "display: none;";
  document.getElementById("result").style = "";
  document.getElementById("operationPane").style = "";

  setNextOperation();
}
  
function setNextOperation() {
  currentOperation = this.training.getCurrentOperation();

  if(!currentOperation) {
    document.getElementById("operationPane").style = "display: none;";
    return;
  }

  currentIndex++;

  document.getElementById("operation").innerHTML = currentOperation.getOperation();
  document.getElementById("enteredAnswer").value = "";
  document.getElementById("enteredAnswer").focus();

  timeLeft = secondsPerOperation;
  document.getElementById("seconds").innerHTML = timeLeft;
  intervalId = setInterval(countdown, 1000); 
  timeOutId = setTimeout(function(){ timeOut(currentIndex) }, secondsPerOperation * 1000);
}
      
function countdown() {
  document.getElementById("seconds").innerHTML = timeLeft-1;
  if (timeLeft == 0) {
    clearTimeout(intervalId);
  } else {
    timeLeft--;
  }
}

function timeOut(_currentIndex) {
  if(_currentIndex === currentIndex && !training.getOperation(_currentIndex - 1).answer) {
     checkAnswer();
  } 
}

function checkAnswer() {
  clearTimeout(timeOutId);
  clearTimeout(intervalId);

  var enteredValue = document.getElementById("enteredAnswer");

  if(!(enteredValue === ""))
    enteredValue = parseInt(document.getElementById("enteredAnswer").value);
  
  currentOperation.answer = enteredValue;
  currentOperation.responseTime = secondsPerOperation - timeLeft;
  currentOperation.savedTime = timeLeft;
  training.setAnswer(currentOperation);

  if(currentOperation.isCorrectAnswer()) {
    document.getElementById("correctTotal").innerHTML = training.totalCorrectAnswers;
    document.getElementById("correctPanel").innerHTML = document.getElementById("correctPanel").innerHTML + "<br>" + currentOperation.getSolvedOperation();
  } else {
    document.getElementById("wrongTotal").innerHTML = training.totalWrongAnswers;
    document.getElementById("wrongPanel").innerHTML = document.getElementById("wrongPanel").innerHTML + "<br>" + currentOperation.toString() + " (valor certo: " + currentOperation.soveOperation() + ")" ;
  }
  
  document.getElementById("total").innerHTML = training.totalOperationsAnswered;

  document.getElementById("avarageTime").innerHTML = training.getAvarageResponseTime();

  document.getElementById("score").innerHTML = training.totalScore;

  setNextOperation();
}

function verifyPressedKey(event) {
  if (event.keyCode == 13 || event.which == 13){
    document.getElementById("btCheckAnswer").click();
  }
}

function verifyTables() {
  for(var i = 2; i <= 9; i++) {
    if(document.getElementById(i).checked) {
      document.getElementById("btTrain").disabled = false;
      return;
    }

    document.getElementById("btTrain").disabled = true;
  }
}
