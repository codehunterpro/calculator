const display = document.querySelector("h1");
const buttons = document.querySelectorAll("button");
const clear = document.querySelector(".clear");

// Global Value
let firstValue = 0;
let operatorvalue = "";
let awaitingNextValue = false;

function getValue(value) {
  // Replace Current display value if first value is entered
  if (awaitingNextValue) {
    display.textContent = value;
    awaitingNextValue = false;
  } else {
    // If Current Display Value is 0, replace it, if not add number
    const displayValue = display.textContent;
    display.textContent = displayValue === "0" ? value : displayValue + value;
  }
}

function addDecimal() {
  // Prevent If Operator Clicked not Decimal
  if (awaitingNextValue) return;

  // If no decimal, add one
  if (!display.textContent.includes(".")) {
    display.textContent = `${display.textContent}.`;
  }
}

// Calculation Object
const CalcObj = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
  // Prevent if operator is clicked
  if (operatorvalue && awaitingNextValue) {
    operatorvalue = operator;
    return;
  }
  const CurrentValue = Number(display.textContent);
  if (!firstValue) {
    firstValue = CurrentValue;
  } else {
    const calculation = CalcObj[operatorvalue](firstValue, CurrentValue);
    
    display.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNextValue = true;
  operatorvalue = operator;
}

buttons.forEach((button) => {
  if (button.classList.length === 0) {
    button.addEventListener("click", () => getValue(button.value));
  } else if (button.classList.contains("operator")) {
    button.addEventListener("click", () => useOperator(button.value));
  } else if (button.classList.contains("decimal")) {
    button.addEventListener("click", () => addDecimal());
  }
});

// Reset display
function resetAll() {
  display.textContent = "0";
  firstValue = 0;
  operatorvalue = "";
  awaitingNextValue = false;
}

// Event Listener
clear.addEventListener("click", resetAll);
