// File created by Jiahao Zhang 7/13/2022

// Created 7/13/2022 by Jiahao Zhang
// Instantiates the Scientific Calculator model
function SciCalculator() {
  this.numStack = [];
  this.optStack = ["("];
  this.curNum = "";
  this.prevInput = "";
  this.curExpression = "";
  this.prevExpression = "";
  this.leftCnt = 0; //the number of "(" left
  this.states = []; // for DEL operation
  this.entry = ""   // meaningful iff prevInput === "unaryOperation" or a parentheses block has just finished
  this.blockExpressions = [];
  this.pressedEqual = false;
  this.recordState();
}

// Created 7/13/2022 by Jiahao Zhang
// Records the current state
SciCalculator.prototype.recordState = function(){
  this.states.push({
    optStack: [...this.optStack],
    curNum: this.curNum,
    numStack: [...this.numStack],
    prevInput: this.prevInput,
    curExpression: this.curExpression,
    prevExpression: this.prevExpression,
    leftCnt: this.leftCnt,
    entry: this.entry,
    blockExpressions: this.blockExpressions,
    pressedEqual: this.pressedEqual
  });
}

// Created 7/13/2022 by Jiahao Zhang
// Resets the calculator back to its initial state
SciCalculator.prototype.resetState = function(){
  this.numStack = [];
  this.optStack = ["("];
  this.curNum = "0";
  this.prevInput = "";
  this.curExpression = "";
  this.prevExpression = "";
  this.leftCnt = 0; //the number of "(" left
  this.states = []; // for DEL operation
  this.entry = "";  
  this.blockExpressions = []; //1+2(1+2(1+1)) [(1+2(1+1)), (1+1)]
  this.pressedEqual = false;
  this.recordState();
}

// Created 7/13/2022 by Jiahao Zhang
// Goes back to the last state
SciCalculator.prototype.rollBack = function(){
  if(this.states.length > 1){
    this.states.pop();
    var prevState = this.states.slice(-1)[0];
    for(p in prevState) this[p] = prevState[p];
    this.pressedEqual = false;
  }
}

// Created 7/14/2022 by Jiahao Zhang
// Clear the current entry
SciCalculator.prototype.clearEntry = function(){
  if(this.prevInput=="number" || this.prevInput == "rightParenthesis" || this.prevInput == "unaryOperation"){
    var exp = this.curExpression.slice(0, -this.entry.length);
    var prevState = this.states.slice(-1)[0]
    while(prevState.curExpression != exp){
      st = this.states.pop();  // keep popping the element until the state match
      prevState = this.states.slice(-1)[0];
    }
    for(p in prevState) this[p] = prevState[p];
    this.pressedEqual = false;
  }
}

// Created 7/13/2022 by Jiahao Zhang
// Updates the view, allowing the current and previous expressions to be displayed
SciCalculator.prototype.updateDisplay = function(){
  document.getElementById("previous").innerHTML = this.prevExpression=="" ? "0" : this.prevExpression;
  document.getElementById("output").innerHTML = this.curExpression=="" ? "0" : this.curExpression;
}

// Created 7/13/2022 by Jiahao Zhan
// Edited 7/14/2022 by Yiming Liu: fixed the new case
// Appends the current digit to the correct operand (when the unary operation is not clicked)
SciCalculator.prototype.appendNumber = function(digit, forBlock=false) {
  if (this.prevInput != "unaryOperation") {
    if (!(digit === "." && this.curNum.includes("."))) {
      var prevLength = this.curNum.length;
      this.curNum = this.curNum === "0" ? digit : this.curNum + digit;
      this.prevInput = "number";
      if(!forBlock){
        if(prevLength!=0) this.curExpression = this.curExpression.slice(0, -prevLength);
        this.curExpression += this.curNum;
        this.entry = this.curNum;
        this.updateBlockExpressions(digit);
        this.pressedEqual = false;
        this.recordState();
      }
    }
  }
}

// Created 7/13/2022 by Jiahao Zhang
// Edited 7/14/2022 by Max Zahner: Fixed factorial issues with negatives and decimals
// Adds the unary operation to the currExpression when the last operation is not "("
SciCalculator.prototype.addUnaryOperation = function(curOpt){
  if(this.prevInput === "number" || this.prevInput === "unaryOperation" || this.prevInput === "rightParenthesis"){
    var curNum = this.curNum - 0;
    var curEntry = this.prevInput !== "number" ? this.entry : this.curNum;
    var entryLength = curEntry.length;
    this.curExpression = this.curExpression.slice(0,-entryLength);
    this.updateBlockExpressions("", entryLength);
    switch(curOpt){
      case "+/-":
        this.entry = "(-"+curEntry+")";
        this.curExpression += this.entry;
        this.curNum = "" + math.multiply(math.bignumber(-1), math.bignumber(curNum));
        break;
      case "!":
        this.entry = curEntry;
        if(!(this.entry.includes(".")||this.entry.includes("-"))){
        this.entry += "!";
        this.curNum = "" + math.factorial(math.bignumber(curNum));
        }
        this.curExpression += this.entry;
        break;
      case "^2":
        if(this.prevInput === "rightParenthesis")  this.entry = curEntry+"^2";
        else  this.entry = "("+curEntry+")^2";
        this.curExpression += this.entry;
        this.curNum = "" + math.pow(math.bignumber(curNum), math.bignumber(2));
        break;
      case "log":
        if(this.prevInput === "rightParenthesis")  this.entry = "log" + curEntry;
        else  this.entry = "log("+curEntry+")";
        this.curExpression += this.entry;
        this.curNum = "" + math.log(math.bignumber(curNum), math.bignumber(10));
        break;
      case "ln":
        if(this.prevInput === "rightParenthesis")  this.entry = "ln" + curEntry;
        else  this.entry = "ln("+curEntry+")";
        this.curExpression += this.entry;
        this.curNum = "" + math.log(math.bignumber(curNum));
        break;
      case "^-1":
        if(this.prevInput === "rightParenthesis")  this.entry = curEntry+"^-1";
        else  this.entry = "("+curEntry+")^-1";
        this.curExpression += this.entry;
        this.curNum = "" + math.pow(math.bignumber(curNum), math.bignumber(-1));
        break;
      case "sqrt":
        if(this.prevInput === "rightParenthesis")  this.entry = "sqrt" + curEntry;
        else  this.entry = "sqrt("+curEntry+")";
        this.curExpression += this.entry;
        this.curNum = "" + math.sqrt(math.bignumber(curNum));
        break;
      case "abs":
        this.entry = "|"+curEntry+"|";
        this.curExpression += this.entry;
        this.curNum = "" + math.abs(math.bignumber(curNum));
        break;
    }
      this.updateBlockExpressions(this.entry);
    this.prevInput = "unaryOperation";
    this.pressedEqual = false;
    this.recordState();
  }
}

// Created 7/13/2022 by Jiahao Zhang
// Edited 7/14/2022 by Yiming Liu: fixed the new case
// Adds the binary operation to the currExpression when the last operation is digit, unary operation or ")"
SciCalculator.prototype.addOperation = function(curOpt, forBlock=false){
  if(this.prevInput !== "leftParenthesis"){
    if(this.prevInput === "binaryOperation")  this.rollBack();
    var lastOpt = this.optStack.slice(-1);
    var curNum = this.curNum - 0;
  
    if(lastOpt == "*"){
      var lastNum = this.numStack.pop();
      this.numStack.push(lastNum * curNum);
      this.optStack.pop();
    }else if(lastOpt == "/"){
      var lastNum = this.numStack.pop();
      this.numStack.push(lastNum / curNum);
      this.optStack.pop();
    }else if(lastOpt == "%"){
      var lastNum = this.numStack.pop();
      this.numStack.push(lastNum % curNum);
      this.optStack.pop();
    }else{  // "+"
      this.numStack.push(curNum);                                                                                                                                                 
    }
  
    this.curNum = "";
    if(!forBlock || curOpt==="*") this.updateBlockExpressions(curOpt);
  
    if(!forBlock){
      if(curOpt == "-"){
        this.optStack.push("+");
        this.numStack.push(-1);
        this.optStack.push("*");
      }else{
        this.optStack.push(curOpt);
      }
      this.prevInput = "binaryOperation";
      this.curExpression += curOpt;
      this.pressedEqual = false;
      this.recordState();
    }
  }
}

// Created 7/13/2022 by Jiahao Zhang
// Updates the expressions of block (parenthese)
SciCalculator.prototype.updateBlockExpressions = function(input, sliceLength=0){
  for(var i = 0; i < this.blockExpressions.length; i++){
    this.blockExpressions[i] = this.blockExpressions[i] + input;
    if(sliceLength!=0)  this.blockExpressions[i] = this.blockExpressions[i].slice(0, -sliceLength);
  }
}

// Created 7/13/2022 by Jiahao Zhang
// Edited 7/14/2022 by Yiming Liu: fixed the new case
// Appends only the "(" to the currExpression when the last operation is binary operation or "("
// Appends the "*" and "(" to the currExpressioin when the last operation is digit, unary operation or ")"
SciCalculator.prototype.addLeftParenthesis = function(){
  var prevInput = this.prevInput;
  if(prevInput!=="binaryOperation"){
    this.addOperation("*");
  }
  this.blockExpressions.push("");
  this.updateBlockExpressions("(");
  this.optStack.push("(");
  this.curExpression += "(";
  this.leftCnt++;
  this.prevInput = "leftParenthesis";
  this.pressedEqual = false;
  this.recordState();
}

// Created 7/13/2022 by Jiahao Zhang
// Edited 7/14/2022 by Yiming Liu: fixed the new case
// Adds the ")" to the currExpression when all the "(" are not closed
SciCalculator.prototype.addRightParenthesis = function(pressedEqual=false){
  if(this.leftCnt > 0 || pressedEqual){
    this.updateBlockExpressions(")");
    this.entry = this.blockExpressions.pop();
    this.addOperation("+", true); // evaluate the previous operation before summing up the block
    var blockRes = this.numStack.pop();
    while(this.optStack.pop()!="(") blockRes += this.numStack.pop();
    this.prevInput = "";  // make the appendNumber works
    this.appendNumber(blockRes, true);  // replace the block with the block result without changing the current expression
    this.curExpression += ")";
    this.leftCnt--;
    this.prevInput = "rightParenthesis";
    this.pressedEqual = false;
    this.recordState();
  }
}

// Created 7/13/2022 by Jiahao Zhang
// Performs the logic of equals when the last operation is not "(". Will evaluate the currExpression.
SciCalculator.prototype.equal = function() {
  this.addRightParenthesis(true);
  var preExp = this.curExpression.slice(0, -1);
  var curNum = this.curNum;
  this.resetState();
  this.prevExpression = preExp;
  this.recordState();
  this.curExpression = curNum;
  this.prevInput = "number";
  this.entry = "" + this.curNum;
  this.curNum = curNum;
  this.recordState();
  this.pressedEqual = true;
}

// Created the sicentific calculator object
const sciCalculator = new SciCalculator();
