# Calculator App

## 1. How to Run:
    Open interface.html in file browser. Use GUI on Firefox Browser in Ubuntu VM

## 2. Test Plan

### Term explanation:
    "digit" buttons are 0-9 and "."
    "binary operation" buttons are "+", "-", x", "/"
    "unary operation" buttons are "+/-", "x^2", "|x|", "2√x", "1/x", "%", "log", "ln", "n!"
    "equal" button is "="
    "memory" button are "MS", "M+", "M-", "MC", "MR"
    "clear" button are "C", "CE", "DEL"

### Calculation Related:
#### appendNumber(): 
    A. With "0" on display
        test 1: Click any "digit" button but ".", the digit replaces "0" on display
    B. With "." on  display
        test 1: Click "." "digit" button, the display area doesn't change
        test 2: Click any "digit" button but ".", the digit is appended to ".", e.g., ".1"
    C. With any digit other than "0" and "." on display
        test 1: Click any "digit" button, the digit is appended to the number on display
                e.g., if "12" is on display, click digit button "3", "123" is on display
                    if "1" is on display, click digit button ".", "1." is on display
    D. When "Binary Operation" was clicked
        test 1: Click any "digit" button, the digit is on display
    E. When "equal" button was clicked
        test 1: Click any "digit" button, currExpression area displays the digit and the prevExpression is "0"

    In Scientific Mode:
        F. When "Unary Operation" was clicked
            test 1: you cannot click any digit

#### addOperation(): 
    In standard mode:
        A. With no operation on display
            test 1: Click any "binary operation" button, the operation is applied to the curreExpression on display
        B. With one operation on display
            test 1: When there is only one operand on display, the operation replaces the operation on display
            test 2: When there is two operands on display, the computed result and operation are on display 

    In Scientific Mode:
        A. When the last operation was "digit"
            test 1: Click any "binary operation" button, the operation is applied to the curreExpression on display
            test 2: After the "equal" button is clicked, the operation is applied to the curreExpression on display
        B. When the last operation was "binary operation"
            test 1: Click any "binary operation" button, replaces the previous operation with the current one
        C. When the last operation was "unary operation"
            test 1: Click any "binary operation" button, appends the operation to the curreExpression on display
        D. When the last operation was "left parenthesis"
            test 1: Click any "binary operation" button, the "binary operation" button is disabled
        E. When the last operation was "right parenthesis"
            test 1: Click any "binary operation" button, appends the operation to the currExpression on display

#### addUnaryOperation():
    In Scientific Mode:
        A. When the last operation was "digit"
            test 1: Click any "unary operation" button, the operation is applied to the last operand 
            test 2: After the "equal" button is clicked, the "unary operation" is applied to the last operand
        B. When the last operation was "binary operation"
            test 1: Click any "unary operation" button, the "unary operation" button is disabled
        C. When the last operation was "unary operation",
            test 1: Click any "unary operation" button, the operation is applied to the last "unary operation"
        D. When the last operation was "left parenthesis"
            test 1: Click any "unary operation" button, the "unary operation" button is disabled
        E. When the last operation was "right parenthesis"
            test 1: Click any "unary operation" button, the operation is applied to the parentheses 

#### equal():
    A. When the last operation is "binary operation"
        test 1: Click the "equal" button, the number before the "binary operation" is on display
    B. When the last operation is not "binary operation"
        test 1: Click the "equal" button, the calculation result is on display
    C. When the last operation is "left parenthesis"
        test 1: Click the "equal" button, the "equal" button is disabled

#### addLeftParenthesis():
    A. When the last operation is "digit"
        test 1: Click the "(" button, the "*"(multiplication) operation and "(" is appended to the digit
    B. When the last operation is "binary operation"
        test 1: Click the "(" button, the "*" is appended to the "binary operation"
    C. When the last operation is "unary operation"
        test 1: Click the "(" button, the "x"(multiplication) operation and "(" is appended to the digit
    D. When the last operation is "left parenthesis"
        test 1: Click the "(" button, the "*" is appended to the "left parenthesis"
    E. When the last operation is "right parenthesis"
        test 1: Click the "(" button, the "x"(multiplication) operation and "(" is appended to the digit

#### addRightParenthesis():
    A. When all the "left parenthesis" are closed
        test 1: Click the ")" button, the ")" button is disabled
    B. When all the "left parenthesis" are not closed
        test 2: Click the "(" button, the ")" is appended to the curreExpression

### Memory Related:

#### memoryStore():
    A. When there is no number stored in the memory
        test 1: Click the "MS" button, 
    B. When there is one number stored in the memory

#### memoryAdd():
    A. When there is no number stored in the memory
        test 1: Click the "M+" button. Expected result: 0 in the memory.
    B. When there is one number stored in the memory
        Click the "5" button. Click the "MS" button. Click the "C" button. Click the "1" button. Click the "M+" button. Expected result: 5 changes to 6 in the memory.

#### memorySubtract():
    A. When there is no number stored in the memory.
        test 1: Click the "M-" button. Expected result: 0 in the memory.
    B. When there is one number stored in the memory
        Click the "5" button. Click the "MS" button. Click the "C" button. Click the "1" button. Click the "M-" button. Expected result: 5 changes to 6 in the memory.

#### memoryStore():
    A. When there is no number stored in the memory.
        test 1: Click the "5" button. Click the "MS" button. Expected result: Single number of 5 in the memory.
    B. When there is one number stored in the memory.
        test 1: Repeat the steps for test 1 of part A. Then, press the "C" button. Then, press the "1" button. Then, press the "MS" button. Expected result: 5 and 1 in the stack with 5 second and 1 first.

#### memoryClear():
    A. When there is no number stored in the memory.
        test 1: Click the "MC" button. Expected result: No change.
    B. When there is one number stored in the memory.
        test 1: Click the "5" button. Click the "MS" button. Press the "MC" button. Expected result: 5 disappears from the memory.

### Deletion Related:
#### DEL():
    A. When there is no number in the current expression.
        test 1: Click the "DEL" button. Expected result: No change.
    B. When there is one number in the current expression.
        test 1. Click the "1" button. Click the "DEL" button. Expected result: 1 appears on the calculator and then is deleted.
    C. When there are two numbers in the current expression.
        test 1. Click the "1" button. Click the "2" button. Click the "DEL" button. Expected result: 1 appears on the calculator, 2 follows it. 2 is deleted, leaving 1 remaining.
    D. When there is a number and operator in the current expression.
        test 1. Click the "1" button. Click the "+" button. Click the "DEL" button. Expected result: 1 appears on the calculator, + follows it. + is deleted, leaving 1 remaining.

#### C():
    A. When there is no number in the current expression.
        test 1: Click the "C" button. Expected result: No change.
    B. When there is one number in the current expression.
        test 1. Click the "1" button. Click the "C" button. Expected result: 1 appears on the calculator and then is deleted.
    C. When there is one number in the current expression and one in the prevExpression.
        test 1. Click the "1" button. Click the "=" button. Click the "1" button. Click the "C" button. Expected result: both numbers are deleted.

#### CE():
    A. When there is no number in the current expression.
        test 1: Click the "C" button. Expected result: No change.
    B. When there is one number in the current expression.
        test 1. Click the "1" button. Click the "C" button. Expected result: 1 appears on the calculator and then is deleted.
    C. When there is one number in the current expression and one in the prevExpression.
        test 1. Click the "1" button. Click the "=" button. Click the "1" button. Click the "C" button. Expected result: The 1 in the current expression is deleted, the 1 in the prevExpression remains.

## 3. Teammates contributions

### Jihao Zhang:

    - implemented sciArithmetic
    - implemented the model of arithmetic
    - implemented the memory buttons disabled effect
    - implemented the MS button logic in memoryFunction.js
    - Binded the scientific calculator to controller(including clear buttons, digit buttons, unary&binary operator buttons and "(" / ")" buttons)
    - helped designing the test plan for scientific Calculator

### Max Zahner:

    - Model for equations in regular (non-scientific calculator)
    - Current Expression construction
    - Handled imaginary number errors
    - Imported and refactored logic to math.js
    - Handled single operation operands
    - Modified DEL to work on operation and prevOperand
    - Modified addOperation to fit with single operand operations
    - Logic for equal (if no operation and current operand is specified, the previous operation and operand are applied to the leading operand)
    - Updated memory functions to math.js instead of ordinary js math

### Yiming Liu:

    - CSS for the calculator and scientific mode toggle function
    - Model the structure of controller, memory functions and the calculator in standard mode
    - Created constructor of the Calculator and the functions of appendNumber, addOperations, and getCurrNum
    - Created scientific mode button listener

### Yinchu Sun:

    - Created all clear structures in clear.js
    - Implemented the "C" button (clear all function) in clear.js
    - Implemented the "+/-" button (negate) listener in clear.js
    - Implemented the original negate function.
    - Created ifValid function in controller.js
    - Keyboard Input function.
    - Implemented the memoryRecall function in memoryFunction.js

### Jeremy Mach:

    - Moved functions to controller.js, clear.js
    - memoryStore in memoryFunction.js
    - memoryAdd in memoryFunctions.js
    - Implemented the initial memory listeners, got changed later
    - Implemented memory in HTML and CSS
    - Added various calculations in arithmetic.js
    - Wrote test cases for memoryStore, memoryClear, CE, C, DEL


## 4. Keyboard Button

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