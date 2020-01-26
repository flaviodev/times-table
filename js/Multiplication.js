class Multiplication {
    constructor(firstElement, secondElement) {
      this.firstElement = firstElement;
      this.secondElement = secondElement;
      this.answer = undefined;
      this.responseTime = undefined;
      this.savedTime = undefined;
    }

    isCorrectAnswer() {
      return this.answer === this.soveOperation();
    }

    getOperation() {
      return this.firstElement + " X " + this.secondElement + " = ";
    }
    
    toString() {
      var _answer = "?";
      if(this.answer)
        _answer = this.answer;

      return this.getOperation() + _answer;
    }

    soveOperation() {
      return this.firstElement * this.secondElement;
    }

    getSolvedOperation() {
      return this.getOperation() + this.soveOperation();
    }
  }