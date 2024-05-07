document.querySelector(".operators").
addEventListener("click", handleCalculatorInput);

let expression = [4, "/" , 5];


function calculate() {
  let result;
  switch (expression[1]) {
    case "+":
      result = expression[0] + expression[2];
      break;
    case "-":
      result = expression[0] - expression[2];
      break;
    case "*":
      result = expression[0] * expression[2];
      break;
    case "/":
      result = expression[0] / expression[2];
      break;
    return result;
  }
  return result;
}

console.log(calculate())

function handleCalculatorInput(event) {
  let group = event.target.value;
  switch (group) {
    case "number":

      break;
    case "operator":
     
      break;
    case "function":
      
      break
  }
}