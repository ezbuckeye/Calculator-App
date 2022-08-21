// Created 7/8/2022 by Yiming Liu
// Edited 7/3/2022 by Max Zahner: basic storage and response to event listeners
// Edited 7/3/2022 by Jeremy Mach: = event listener
// Edited 7/4/2022 by Max Zahner: corrected output
// Edited 7/4/2022 by Max Zahner: refactoring
// Edited 7/4/2022 by Yiming Liu: memory function listeners
// Edited 7/5/2022 by Yiming Liu: changes to digit listener and refactoring
// Edited 7/6/2022 by Yinchu Sun: +/- listener and clear listeners
// Edited 7/7/2022 by Jiahao Zhang: Implemented clear and memory behavior as well as blocked off buttons
// Edited 7/7/2022 by Yinchu Sun: Keyboard input
// Edited 7/7/2022 by Jeremy Mach: Memory functions
// Edited 7/7/2022 by Yiming Liu: Scientific calculator

// controller.js serves as the "controller" part of the MVC model. Controller.js contains the addEventListener functions for most of 
// the buttons on the calculator. It is here where the majority of the calculator is set up.

var memory = new Memory();
var isSci = false;
var curCalc = calculator;


// Edited by Max Zahner 7/3/2022: Corrected digit input such that digit input is properly registered and stored (outputs to console)
// Edited by Max Zahner 7/4/2022: Outputting number to calculator interface and added operations response
// Edited by Yiming Liu 7/5/2022: Refactored the way of adding a digit
// Edited by Yinchu Sun 7/13/2022: changed digits[i].value to digits[i].innerHTML.
// Listener for the digit buttons and . button
var digits = document.getElementsByName("digit");
for (let i = 0; i < digits.length; i++) {
  digits[i].addEventListener("click", function () {
    if(curCalc.pressedEqual) curCalc.resetState();
    curCalc.appendNumber(digits[i].id);
    curCalc.updateDisplay();
  });
}

// Created 7/3/2022 by Jeremy Mach
// Edited 7/4/2022 by Jeremy Mach: Reformat
// Edited 7/5/2022 by Yiming Liu: Refactored the way of adding a operation
// Listener for operation buttons: +, - , *, /
var operations = document.getElementsByName("operation");
for (let i = 0; i < operations.length; i++) {
  operations[i].addEventListener("click", function () {
    curCalc.addOperation(operations[i].value);
    curCalc.updateDisplay();
  });
}

// Created 7/13/2022 by Jiahao Zhang
// Adding listeners for singleOperandOperations
var unaryOperations = document.getElementsByName("singleOperandOperation");
for (let i = 0; i < unaryOperations.length; i++) {
  unaryOperations[i].addEventListener("click", function () {
    curCalc.addUnaryOperation(unaryOperations[i].value);
    curCalc.updateDisplay();
  });
}

// Created 7/13/2022 by Jiahao Zhang
// Adding listener for left parenthesis 
document.getElementsByName("left")[0].addEventListener("click", function(){
  curCalc.addLeftParenthesis();
  curCalc.updateDisplay();
});

// Created 7/13/2022 by Jiahao Zhang
// Adding listener for right parenthesis
document.getElementsByName("right")[0].addEventListener("click", function(){
  curCalc.addRightParenthesis();
  curCalc.updateDisplay();
});

// Created 7/3/2022 by Jeremy Mach
// Edited 7/4/2022 by Jeremy Mach: Reformat
// Edited 7/5/2022 by Yiming Liu: Refactored the way of adding the "equals" button
// Listener for =
var equal = document.getElementById("equals");
equal.addEventListener("click", function () {
  if (curCalc !== sciCalculator || curCalc.leftCnt === 0) curCalc.equal();
  curCalc.updateDisplay();
});


// Created 7/5/2022 by Yinchu Sun
// Keyboard listener for digits and other valid calculator operations
function ifValid(key) {
  var validKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "=", "+", "-", "*", "/", "Backspace", 
  "Delete", "Enter", "Escape", "F9", "R", "r", "Q", "q", "L", "l", "N", "n", "!", "@", "%", "|", "(", ")"]
  if (validKeys.indexOf(key) > -1) return true;
  return false;
}

// Created 7/7/2022 by Yinchu Sun
// Listener for keyboard input
var keyboardInput = document.addEventListener("keydown", function(input) {
    if (ifValid(input.key)) {
      // console.log(input.key);
        if (input.key === "Enter" || input.key === "=") {
          input.preventDefault();
          document.getElementById("equals").click();
        } else if (input.key === "Backspace") {
          document.getElementById("delete").click();
        } else if (input.key === "Escape") {
          document.getElementById("clearAll").click();
        } else if (input.key === "Delete") {
          document.getElementById("clearEntry").click();
        } else if (input.key === "F9") {
          document.getElementById("negate").click();
        } else if (input.key === "r" || input.key === "R") {
          document.getElementById("1/x").click();
        } else if (input.key === "q" || input.key === "Q") {
          document.getElementById("^2").click();
        } else if (input.key === "L" || input.key === "l") {
          document.getElementById("log").click();
        } else if (input.key === "N" || input.key === "n") {
          document.getElementById("ln").click();
        } else if (input.key === "!") {
          document.getElementById("!").click();
        } else if (input.key === "@") {
          document.getElementById("@").click();
        } else if (input.key === "%") {
          document.getElementById("%").click();
        } else if (input.key === "|") {
          document.getElementById("|").click();
        } else if (input.key === "(") {
          document.getElementById("(").click();
        } else if (input.key === ")") {
          document.getElementById(")").click();
        } else {
          document.getElementById(input.key).click();
        } 
    }
    console.log(input.key);
});

// Listener for memory buttons: MS, M+, M-, MC, MR
// var memoryButtons = document.getElementsByClassName("memory-button");
// Array.from(memoryButtons).forEach(function (element) {
//   element.addEventListener("click", function () {
//     memory[element.id]();
//   });
// });

// Created 7/4/2022 by Yiming Liu
// Edited 7/7/2022 by Jeremy Mach: Implemented MS, Implemented M+
// Listener for memory buttons: MS, M+, M-, MC, MR
Array.from(document.getElementsByClassName("memory-button")).forEach(function (element) {
    element.addEventListener("click", function () {
        switch (element.innerHTML) {
            case "MC":
                memory.memoryClear();
                toggleButtons(true);
                break;
            case "MR":
                memory.memoryRecall();
                break;
            case "M+":
                memory.memoryAdd();
                toggleButtons(false);
                break;
            case "M-":
                memory.memorySubstract();
                break;
            case "MS":
                memory.memoryStore();
                toggleButtons(false);
            default:
        }
    });
});

// Created 7/7/2022 by Jiahao Zhang
// Disabling memory buttons which should not be enabled
function toggleButtons(shouldDisabled) {
  Array.from(document.getElementsByClassName("memory-button")).forEach(function (element) {
    switch (element.innerHTML) {
      case "MC":
        element.disabled = shouldDisabled;
        if (shouldDisabled) element.style.backgroundColor = "#646161";
        else element.style.backgroundColor = "#bb0000";
        break;
      case "MR":
        element.disabled = shouldDisabled;
        if (shouldDisabled) element.style.backgroundColor = "#646161";
        else element.style.backgroundColor = "#bb0000";
        break;
      case "M-":
        element.disabled = shouldDisabled;
        if (shouldDisabled) element.style.backgroundColor = "#646161";
        else element.style.backgroundColor = "#bb0000";
        break;
      default:
        break;
    }
  });
}

toggleButtons(true);

// Created 7/7/2022 by Yiming Liu
// Added scientific mode button listener
document.getElementById("sci-mode").addEventListener("click", function () {
  Array.from(document.getElementsByClassName("mode")).forEach(function (element) {
    element.classList.toggle("visbility");
  });
  curCalc.resetState();
  curCalc.updateDisplay();
  curCalc = calculator == curCalc ? sciCalculator : calculator;
  isSci = !isSci;
});

