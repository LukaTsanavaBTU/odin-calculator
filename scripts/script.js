const displayDiv = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const positiveNegativeButton = document.querySelector(".positive-negative");
const decimalButton = document.querySelector(".decimal");
const deleteButton = document.querySelector(".delete");

let operandA = operandB = operator = null;
let equalsPressed = false;

const operations = {
    "+"(a, b) {
        return a + b;
    },
    "-"(a, b) {
        return a - b;
    },
    "x"(a, b) {
        return a * b;
    },
    "÷"(a, b) {
        return a / b;
    }
};

function operate(a, b, operation) {
    return operations[operation](a, b);
}

function equalsHandler(event) {
    if (operandA && operator) {
        operandB = parseFloat(displayDiv.textContent);
        displayDiv.textContent = operate(operandA, operandB, operator);
        operandA = operandB = operator = null;
        equalsPressed = true;
    }
}

numberButtons.forEach(button => {
    button.addEventListener("click", event => {
        const numPressed = button.textContent;
        const curNum = displayDiv.textContent;
        if (equalsPressed) {
            displayDiv.textContent = "";
            equalsPressed = false;
        } 
        if (curNum === "0" && numPressed !== "0") {
            displayDiv.textContent = "";
        }
        if (curNum !== "0" || numPressed !== "0") {
            displayDiv.textContent += button.textContent; 
        }
    });
});

operationButtons.forEach(button => {
    button.addEventListener("click", event => {
        equalsHandler();
        equalsPressed = true
        operandA = parseFloat(displayDiv.textContent);
        operator = button.textContent;
    });
});

equalsButton.addEventListener("click", equalsHandler);

clearButton.addEventListener("click", event => {
    displayDiv.textContent = "0";
    operandA = operandB = operator = null;
});

positiveNegativeButton.addEventListener("click", event => {
    const currentNum = displayDiv.textContent;
    if (displayDiv.textContent !== "0") {
        if (currentNum.at(0) === "-") {
            displayDiv.textContent = currentNum.slice(1);
        } else {
            displayDiv.textContent = "-" + currentNum;
        }
    }
});

decimalButton.addEventListener("click", event => {
    const currentNum = displayDiv.textContent;
    if (equalsPressed) {
        displayDiv.textContent = "0."
        equalsPressed = false;
    } else if (!currentNum.includes(".")) {
        displayDiv.textContent += ".";
    }
});

deleteButton.addEventListener("click", event => {
    const currentNum = displayDiv.textContent;
    if (currentNum !== "0") {
        if (currentNum.length === 1 || (currentNum.length === 2 && currentNum.at(0) === "-")) {
            displayDiv.textContent = "0";
        } else {
            displayDiv.textContent = currentNum.slice(0, currentNum.length - 1);
        }
    }
});

// add division by zero handling
// add display overflow handling
// add keyboard support
