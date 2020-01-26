class Training {
    constructor(arrayTablesNumber) {
      this.arrayTablesNumber = arrayTablesNumber;
      this.operations = this._shuffle(this._generateOperations());
      this.currentOperationIndex = 0;
      this.totalOperationsAnswered = 0;
      this.totalWrongAnswers = 0;
      this.totalCorrectAnswers = 0;
      this.totalTimeResponse = 0;
      this.totalScore = 0;
    }

    getOperation(index) {
        return this.operations[index];
    }

    getCurrentOperation() {
        if(this.currentOperationIndex >= this.operations.length)
            return undefined;

        return this.operations[this.currentOperationIndex];
    }

    setAnswer(operation) {
        this.operations[this.currentOperationIndex] = operation;

        if(operation.isCorrectAnswer()) {
            this.totalCorrectAnswers++;
            this.totalScore += 10;
            this.totalScore += Math.round(operation.savedTime/2);
        } else {
            this.totalWrongAnswers++;
            if(this.totalScore >= 5) {
                this.totalScore -= 5;
            } else {
                this.totalScore = 0;
            }
        }

        this.totalOperationsAnswered++;
        this.totalTimeResponse += operation.responseTime;

        this.currentOperationIndex++;
    }

    getAvarageResponseTime() {
        return  Math.ceil(this.totalTimeResponse / this.totalOperationsAnswered);
    }

    _generateOperations() {
        var operations = [];
        this.arrayTablesNumber.forEach(e => {
            for(var i = 1; i <= 10; i++) {
                operations.push(new Multiplication(e, i)); 
              }    
        });

        return operations;
    }

    _shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        
        while (0 !== currentIndex) {
        
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
        
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        
        return array;
    }    
}