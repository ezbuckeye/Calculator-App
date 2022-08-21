// Created by Jeremy Mach 7/3/2022
// Edited 7/4/2022 by Max Zahner: Output calculator display, fixed bugs and worked on logic
// Edited 7/5/2022 by Yinchu Sun: Keyboard input among other minor fixes
// Edited 7/5/2022 by Yiming Liu: Changed the global variable to object prototyping
// Edited 7/7/2022 by Max Zahner: Documentation changes
// Edited 7/7/2022 by Jeremy Mach: Moved controlling functions into the controller class
// Edited 7/7/2022 by Jiahao Zhang
// Edited 7/11/2022 by Max Zahner: Changed math to math.js to solve bugs
// Edited 7/13/2022 by Max Zahner: Added logic for single operand operations and fixed bugs
// Edited 7/14/2022 by Jiahao Zhang: Changes to seperate normal and scientific calculator

// Created 7/5/2022 by Yiming Liu
// Edited 7/7/2022 by Jiahao Zhang: Refactoring
// Implement the calculator as an object
// All arithmetic expressions in the calculator are of form prevOperand currOperation currOperand ex) 6.5 + 2.3
// Calculator object consists of a previous expression, current expression, previous operand, current operand, current operation, last operation and last operand
function Calculator() {
  this.prevExpression = this.currExpression = "";
  this.prevOperand = this.currOperation = this.currOperand = "";
  this.lastOperation = this.lastOperand = "";
  this.pressedEqual = false;
}

// Created 7/7/2022 by Jiahao Zhang
// Reset the calculator back to its initial state without the need to create a new calculator
Calculator.prototype.resetState = function () {
  this.prevExpression = this.currExpression = "";
  this.prevOperand = this.currOperation = this.currOperand = "";
  this.pressedEqual = false;
}

// Created 7/4/2022 by Max Zahner
// Edited 7/5/2022 by Yiming Liu: Used prototype instead of global variables
// Edited 7/7/2022 by Jiahao Zhang: Refacotring
// Constructs the outputted equation staying consistent with the invariant prevOperand operation currOperand
Calculator.prototype.getCurrExpression = function () {
  this.currExpression = this.prevOperand + this.currOperation + this.currOperand;
}


// Created 7/4/2022 by Max Zahner
// Edited 7/5/2022 by Yiming Liu: Used prototype instead of global variables
// Edited 7/7/2022 by Jiahao Zhang: Simplification of code
// Edited 7/12/2022 by Max Zahner: Handled special case of imaginary numbers
// Updates the view, allowing the current and previous expressions to be displayed
Calculator.prototype.updateDisplay = function () {
  if (this.prevExpression.includes("i") || this.currExpression.includes("i")) {
    window.alert("Error: imaginary number");
    this.resetState();
  }
  document.getElementById("previous").innerHTML = this.prevExpression == "" ? "0" : this.prevExpression;
  document.getElementById("output").innerHTML = this.currExpression == "" ? "0" : this.currExpression;
}

// Created 7/3/2022 by Jeremy Mach 
// Edited 7/3/2022 by Yinchu: added + to arithmetic
// Edited 7/4/2022 by Max: Made work by adding base case and fixing bugs
// Edited 7/5/2022 by Yiming Liu: Used prototype instead of global variables
// Edited 7/7/2022 by Jiahao Zhang: simplify the logic
// Edited 7/11/2022 by Max Zahner: changed to math.js
// Edited 7/13/2022 by Max Zahner: added mod and power and singleOperandOperations among others
// Edited 7/14/2022 by Jiahao Zhang: Moved many functions to the scientific calculator
// Using the previous operand, operation and current operand, will calculate the result, store it into prevOperand and clear currOperand & currOperation. Stores currOperand and currOperation in prevOperand and prevOperation respectively 
Calculator.prototype.calculate = function () {
  prevNumber = this.prevOperand - 0;
  currNumber = this.currOperand - 0;
  switch (this.currOperation) {
    case "+":
      this.prevOperand = "" + math.add(math.bignumber(prevNumber), math.bignumber(currNumber));
      break;
    case "-":
      this.prevOperand = "" + math.subtract(math.bignumber(prevNumber), math.bignumber(currNumber));
      break;
    case "/":
      this.prevOperand = "" + math.divide(math.bignumber(prevNumber), math.bignumber(currNumber));
      break;
    case "*":
      this.prevOperand = "" + math.multiply(math.bignumber(prevNumber), math.bignumber(currNumber));
      break;
    default:
      this.prevOperand = "" + prevNumber ? prevNumber : currNumber;
      break;
  }
  this.prevExpression = this.currExpression;

  this.lastOperation = this.currOperation;
  this.lastOperand = this.currOperand;

  this.currOperation = this.currOperand = "";

  this.getCurrExpression();
}

// Created 7/5/2022 by Yiming Liu
// Edited 7/7/2022 by Jiahao Zhang: Refactoring
// Appends the current digit to the correct operand
Calculator.prototype.appendNumber = function (digit) {
  if (digit === "." && this.currOperand.includes(".")) return;
  // if the currOperand is zero, replace it with the digit
  var isZero = this.currOperand === "0";
  this.currOperand = isZero ? digit : this.currOperand + digit;
  this.getCurrExpression();
  this.pressedEqual = false;
}

// Created 7/5/2022 by Yiming Liu
// Edited 7/7/2022 by Yinchu Sun: Refactoring
// Edited 7/7/2022 by Jiahao Zhang: Refactoring
// Editd 7/13/2022 by Max Zahner: Added in singleOperandFunctions
// Edited 7/13/2022 by Jiahao Zhang: Changes to allow scientific calculator to be in seperate folder
// Adds the specified string parameter operation to the calculator. 
Calculator.prototype.addOperation = function (operation) {
  // when there is no opeartion in the output area
  if (this.prevOperand === "") {
    this.prevOperand = this.currOperand === "" ? "0" : this.currOperand;
    this.currOperand = "";
    // when there is already one operation in the output area
  } else if (this.currOperand !== "") {
    this.calculate();
  }
  this.currOperation = operation;
  this.getCurrExpression();
  this.pressedEqual = false;
}

// Created 7/4/2022 by Max Zahner
// Edited 7/5/2022 by Yiming Liu: Used prototype instead of global variables
// Edited 7/7/2022 by Jiahao Zhang: Edited for unary operations
// Performs the logic of equals. Will evaluate a valid expression if it exists or applies the prevOperand and operation to the currOperand to repeat an equation
Calculator.prototype.equal = function () {
  if (this.currOperation === "") {
    if (this.prevOperand === "") {
      this.addOperation("+");
    }
    this.currOperation = this.lastOperation;
    this.currOperand = this.lastOperand;
  }
  this.getCurrExpression();
  this.calculate();
  this.pressedEqual = true;
}

// Created 7/14/2022 by Yiming Liu
// Get the current number to be used in memory function
Calculator.prototype.getCurrNum = function () {
  if (this.pressedEqual) {
    return this.prevOperand;
  } else {
    return this.currOperand == "" ? "0" : curCalc.currOperand;
  }
}

// Instantiates the calculator
const calculator = new Calculator();
