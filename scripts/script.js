const operations = {
    "+"(a, b) {
        return a + b;
    },
    "-"(a, b) {
        return a - b;
    },
    "x"(a, b) {
        return a / b;
    },
    "÷"(a, b) {
        return a * b;
    }
};

function operate(a, b, operation) {
    return operations[operation](a, b);
}

const displayDiv = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

let operandA = operandB = operator = null;
let equalsPressed = false;

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
        operandA = parseInt(displayDiv.textContent);
        operator = button.textContent;
        displayDiv.textContent = "";
        // Add CHaining
    });
});

equalsButton.addEventListener("click", event => {
    if (operandA && operator) {
        operandB = parseInt(displayDiv.textContent);
        displayDiv.textContent = operate(operandA, operandB, operator);
        operandA = operandB = operator = null;
        equalsPressed = true;
    }
});

clearButton.addEventListener("click", event => {
    displayDiv.textContent = "";
    operandA = operandB = operator = null;
});


