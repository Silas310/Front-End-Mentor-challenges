document.querySelector(".operators").
addEventListener("click", manageCalculator);


function buildMathExpression() {

}


function handleFunction () {

}


function handleCalculatorInput(event){
  let value = event.target.value;
  if(value.length === 1) {
    buildMathExpression(value);
  }else {
    console.log("função");
  }
}