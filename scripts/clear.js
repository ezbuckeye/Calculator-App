// File created 7/13/2022 by Jeremy Mach
// Edited 7/6/2022 by Yinchu Sun: Basic implementations
// Edited 7/7/2022 by Jiahao Zhang: Expanded upon previous implementation
// Edited 7/12/2022 by Max Zahner: Updates to DEL function

// clear.js serves as a file to contain all the listeners and functions of the "clearing" functions such as C, CE, DEL. These 
// are separate as to keep in line with the MVC model.

// Created 7/6/2022 by Yinchu Sun
// Edited 7/7/2022 by Jiahao Zhang: Implemented each function
// Edited 7/12/2022 by Max Zahner: Made del work with operation and prevOperand
// Listener for clear buttons
var clearButtons = document.getElementsByName("clear");
for (let i = 0; i < clearButtons.length; i++) {
    clearButtons[i].addEventListener("click", function () {
        switch (clearButtons[i].innerHTML) {
            // clear (C) everything but memory
            case "C":
                curCalc.resetState();
                if (!isSci) curCalc.lastOperation = calculator.lastOperand = "";
                curCalc.updateDisplay();
                break;
            // clear the last entry
            case "CE":
                if(isSci){
                    curCalc.clearEntry();
                }else{
                    curCalc.currOperand = "";
                    curCalc.getCurrExpression();
                }
                curCalc.updateDisplay();
                break;
            // delete the last digit or operator
            case "DEL":
                if (!isSci) {
                    if (curCalc.currOperand != "") {
                        curCalc.currOperand = calculator.currOperand.slice(0, -1);
                    } else if (curCalc.currOperation != "") {
                        curCalc.currOperation = "";
                    } else if (curCalc.prevOperand != "") {
                        curCalc.currOperand = calculator.prevOperand.slice(0, -1);
                        curCalc.prevOperand = "";
                    }
                    curCalc.getCurrExpression();
                } else {
                    curCalc.rollBack();
                }
                curCalc.updateDisplay();
                break;
            default:
                break;
        }
    });
}
