document.querySelector(".operators").
addEventListener("click", handleCalculatorInput);

let expression = [];


// function showExpression() {

// }


function calculate(){
  switch (expression[1]) {
    case "+":
      return expression[0][0] + expression[2][0];
      break;
  }
}

function showResult(){
  let result = document.querySelector(".result");
  result.innerHTML = expression[0]
}

function storageExpression(value) {
  if (expression.length == 0) {
    expression.push(value);
  }else if(expression.length == 1) {
    expression[0] = value;
  }
}


// dealing with integer and floats
function handleNumber(num) {
  if (expression.length == 0) {
    return num;
  } else if(expression.length == 1) {
    let cont = 10;
    console.log("expression[0]", expression[0])
    expression[0] = expression[0] * cont + num;
    cont = cont * 10;
    return expression[0];
  }
  
}

function handleCalculatorInput(event) {
  let group = event.target.value;
  let value = event.target.innerText;
  switch (group) {
    case "number":
      let num = handleNumber(Number(value));
      console.log("quantidade = ", expression.length, "valor apertado =", num)
      storageExpression(num);
      console.log("quantidade = ", expression.length, "expressao", expression[0])
      let result = calculate(expression);
      break;
    case "operator":
      storageExpression(value, "operator")
      console.log(group);
      break;
    case "function":
      console.log(group);
      break
  }
}