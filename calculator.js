let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

/**
 * Appends a number to the current input
 * @param {string} num - The number to append
 */
function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

/**
 * Appends an operator to the expression
 * @param {string} op - The operator to append (+, -, *, /)
 */
function appendOperator(op) {
    if (currentInput === '' && previousInput === '') return;
    
    if (currentInput === '' && operator) {
        operator = op;
        return;
    }
    
    if (previousInput !== '' && currentInput !== '' && operator) {
        calculateResult();
    }
    
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

/**
 * Appends a decimal point to the current input
 */
function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += currentInput === '' ? '0.' : '.';
    }
    updateDisplay();
}

/**
 * Deletes the last character from the current input
 */
function deleteLastChar() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

/**
 * Clears the entire calculator
 */
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

/**
 * Performs the calculation
 */
function calculate() {
    calculateResult();
}

/**
 * Internal function to calculate the result
 */
function calculateResult() {
    if (!operator || previousInput === '' || currentInput === '') return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 'Error' : prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    previousInput = '';
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

/**
 * Updates the display with the current input
 */
function updateDisplay() {
    display.value = currentInput || '0';
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendDecimal();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        appendOperator(e.key);
    }
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    }
    if (e.key === 'Backspace') deleteLastChar();
    if (e.key === 'Escape') clearDisplay();
});

// Initialize display
updateDisplay();
