# Project-5-Runtime-Terror

How to Run the Project:
    Open interface.html in file browser. Use GUI on Firefox Browser in Ubuntu VM

## Keyboard Button

| Press this key | To do this |
| --- | --- |
| 0-9 | Select 0-9 in Standard mode, Scientific mode |
| + | Select + in Standard mode, Scientific mode |
| - | Select - in Standard mode, Scientific mode |
| * | Select * in Standard mode, Scientific mode |
| / | Select / in Standard mode, Scientific mode |
| = | Select = in Standard mode, Scientific mode |
| Delete | Clear current input (select CE) |
| Backspace | Go back |
| Esc | Fully clear input (select C) |
| Enter | Selects = in Standard mode, Scientific mode |
| F9 | Select +/- in Standard mode, Scientific mode |
| @ | Select 2√x in Scientific mode |
| R | Select 1/x in Scientific mode |
| % | Select % in Scientific mode |
| L | Select log in Scientific mode |
| N | Select ln in Scientific mode |
| Q | Select x^2 in Scientific mode |
| ! | Select n! in Scientific mode |
| % | Select mod in Scientific mode |
| \| | Select \| \| in Scientific mode |
| ( | Select  (  in Scientific mode |
| ) | Select  )  in Scientific mode |
<br>



Teammates contributions-

Jihao Zhang:

    - implemented sciArithmetic
    - implemented the model of arithmetic
    - implemented the memory buttons disabled effect
    - implemented the MS button logic in memoryFunction.js
    - Binded the scientific calculator to controller(including clear buttons, digit buttons, unary&binary operator buttons and "(" / ")" buttons)
    - helped designing the test plan for scientific Calculator

Max Zahner:

    - Model for equations in regular (non-scientific calculator)
    - Current Expression construction
    - Handled imaginary number errors
    - Imported and refactored logic to math.js
    - Handled single operation operands
    - Modified DEL to work on operation and prevOperand
    - Modified addOperation to fit with single operand operations
    - Logic for equal (if no operation and current operand is specified, the previous operation and operand are applied to the leading operand)
    - Updated memory functions to math.js instead of ordinary js math

Yiming Liu:

    - CSS for the calculator and scientific mode toggle function
    - Model the structure of controller, memory functions and the calculator in standard mode
    - Created constructor of the Calculator and the functions of appendNumber, addOperations, and getCurrNum
    - Created scientific mode button listener

Yinchu Sun:

    - Created all clear structures in clear.js
    - Implemented the "C" button (clear all function) in clear.js
    - Implemented the "+/-" button (negate) listener in clear.js
    - Implemented the original negate function.
    - Created ifValid function in controller.js
    - Keyboard Input function.
    - Implemented the memoryRecall function in memoryFunction.js

Jeremy Mach:

    - Moved functions to controller.js, clear.js
    - memoryStore in memoryFunction.js
    - memoryAdd in memoryFunctions.js
    - Implemented the initial memory listeners, got changed later
    - Implemented memory in HTML and CSS
    - Added various calculations in arithmetic.js
    - Wrote test cases for memoryStore, memoryClear, CE, C, DEL
