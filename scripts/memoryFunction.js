// File created 7/4/2022 by Yiming Liu
// File edited 7/7/2022 by Jeremy Mach: Implemented memory
// File edited 7/11/2022 by Max Zahner: Changed math to math.js to solve bugs
// File Edited 7/14/2022 by Yiming Liu: Fixed the function after implementing the sci mode

// memoryFunction.js serves as file to contain all of the memory functions such as MS, M+, M- etc. This file edits the html elements where the table of memory is contained.

// Created 7/4/2022 by Yiming Liu
// Memory is implemented as a stack
function Memory() {
  this.memory = [];
}

// Created 7/4/2022 by Yiming Liu
// Edited 7/7/2022 by Jeremy Mach: Implemented function
// Edited 7/7/2022 by Yiming Liu: Fix error where previous operand was = resulting in NaN
// Edited 7/14/2022 by Yiming Liu: Fixed the function after implementing the sci mode
// Add the number in the input area to the top of the memory
Memory.prototype.memoryStore = function () {
  var table = document.getElementById("memory-table");
  var row = table.insertRow(0);
  var cell = row.insertCell(0);
  var savedNumber;
  if (!isSci) {
    savedNumber = curCalc.getCurrNum();
  } else {
    savedNumber = curCalc.curNum;
  }
  cell.innerHTML = savedNumber;
  this.memory.unshift(savedNumber);
};

// Created 7/5/2022 by Jeremy Mach
// Edited 7/7/2022 by Jeremy Mach: Implement memoryAdd
// Edited 7/7/2022 by Jeremy Mach: Fix error where previous operand was = resulting in NaN
// Edited  7/11/2022 by Max Zahner: changed to math.js calculation
// Edited 7/14/2022 by Yiming Liu: Fixed the function after implementing the sci mode
// Add current operand with current top of stack 
Memory.prototype.memoryAdd = function () {
  if (this.memory.length == 0) {
    this.memoryStore();
  } else {
    topNum = this.memory[0];
    var savedNumber;
    if (!isSci) {
      savedNumber = curCalc.getCurrNum();
    } else {
      savedNumber = curCalc.curNum;
    }

    topNum = math.add(math.bignumber(topNum), math.bignumber(savedNumber));

    this.memory[0] = topNum;

    var table = document.getElementById("memory-table");
    table.deleteRow(0);
    var row = table.insertRow(0);
    var cell = row.insertCell(0);
    cell.innerHTML = topNum;
  }
};

// Created 7/7/2022 by Jiahao Zhang
// Edited  7/11/2022 by Max Zahner: changed to math.js calculation
// Edited 7/14/2022 by Yiming Liu: Fixed the function after implementing the sci mode
// Subtract current operand with current top of stack 
Memory.prototype.memorySubtract = function () {
  topNum = this.memory[0];
  var savedNumber;
  if (!isSci) {
    savedNumber = curCalc.getCurrNum();
  } else {
    savedNumber = curCalc.curNum;
  }

  this.memory[0] = math.subtract(math.bignumber(topNum), math.bignumber(savedNumber));

  var table = document.getElementById("memory-table");
  table.deleteRow(0);
  var row = table.insertRow(0);
  var cell = row.insertCell(0);
  cell.innerHTML = this.memory[0];
}

// Created 7/5/2022 by Yinchu Sun
// Edited 7/7/2022 by Jiahao Zhang
// Get the number from the top of the memory
Memory.prototype.memoryRecall = function () {
  calculator.resetState();
  calculator.currOperand = this.memory[0];
  calculator.getCurrExpression();
  calculator.updateDisplay();
  calculator.updateDisplay();
}

// Created 7/7/2022 by Jiahao Zhang
// Clear the memory stack
Memory.prototype.memoryClear = function () {
  this.memory = [];
  var table = document.getElementById("memory-table");
  table.innerHTML = "";
}