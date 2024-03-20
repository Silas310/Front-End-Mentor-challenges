let billInput = document.querySelector(".bill-input");
let tipBtn = document.querySelectorAll(".btn");
let customInput = document.querySelector(".tip-input");
let peopleInput = document.querySelector(".people-input");
let results = document.querySelectorAll(".result");


function manageValues(e) {
  switch (e.target.className) {
    case "input bill-input":
      storeValues(e.target.value, 1);
      break;
    case "btn":
    case "input tip-input":
      storeValues(e.target.value, 2);
      break;
    case "input people-input":
      storeValues(e.target.value, 3);
      break;
  }
}


let values = {};
function storeValues(value, type) {
  switch (type) {
    case 1:
      values.total = value;
      break;
    case 2:
      values.tip = value;
      break;
    case 3:
      values.divider = value;
      break;
  }
  Object.keys(values).length;
  let resultados = calculateTip(values);
  showResults(resultados);
}


function calculateTip(operands) {
  if (Object.keys(operands).length == 3) {
    let total = parseFloat(operands.total),
        tip = parseFloat(operands.tip / 100),
        divider = parseFloat(operands.divider);
    let results = [];
    results[0] = ( (total * tip) / divider ).toFixed(2); /*Tip*/
    results[1] = ( (total + (total * tip)) / divider ).toFixed(2);
    return results;
  }
}


function showResults(valores) {
  let mostrador = document.querySelectorAll(".result");
  mostrador[0].innerHTML = "$" + valores[0];
  mostrador[1].innerHTML = "$" + valores[1];
}


billInput.addEventListener("input", manageValues);
for (let i = 0; i < tipBtn.length; i++) {
  let item = tipBtn[i].addEventListener("click", manageValues);
}
customInput.addEventListener("input", manageValues);
peopleInput.addEventListener("input", manageValues);