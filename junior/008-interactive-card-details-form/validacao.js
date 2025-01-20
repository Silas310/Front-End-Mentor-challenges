let form = document.querySelector("form");
let inputs = document.querySelectorAll("form input");
let errorMSGs = document.querySelectorAll(".error-msg");


for (let input of inputs) {
  if (input.type !== "submit") {  
    input.addEventListener("input", validateInput);
  } 
}


function validateInput(event) {
  const input = event.target;
  const inputIndex = Array.from(inputs).indexOf(input);


  switch (inputIndex) {
    case 0:
      if (isNameBlank(input) && isNameLengthValid(input) ) {
        writeCard(inputIndex, input.value);
      } else {
        console.log("ERRO");
      }
      break;
    case 1:
      if (isCardNumberValid(input.value)) {
        writeCard(inputIndex, input.value);
      } else {
        console.log("ERRO");
      }
      break;

    case 2:
      if (isMonthValid(input)) {
        writeCard(inputIndex, input.value);
      } else {
        console.log("ERRO");
      }
      break;
  }


  // writeCard(inputIndex, input.value);
}


function isNameBlank(input) {
  if (input.value.trim() == "") { return false;}
  return true;
}


function isNameLengthValid(input) {
  let length =  input.value.trim().length;
  if (length > 25 ) {
    console.log("INVALID")
    return false;
  }
  return true;
}


function isCardNumberValid(number) {
  console.log(number.length)
  if (number.length < 1 || number.length > 16 ) {
    return false;
  }
  return true;
}


function isMonthValid(input) {
  let month = input.value;
  if (month.length < 1 || month > 12) {
    console.log("MES ERRO");
    return false;
  }
  return true;
}


function showError(input, msg) {
  console.log(input, msg);
}


function writeCard(index, value) {
  const cardFields = document.querySelectorAll(".card-field");


  switch (index) {
    case 0:
      if (cardFields[1]) {
        cardFields[1].innerHTML = value.trim().toUpperCase();
      }
      break;

    case 1:
      if (cardFields[0]) {
        cardFields[0].innerHTML = value;
      }
      break;

    case 2:
      if (cardFields[index]) {
        cardFields[index].children[0].innerHTML = value;
      }
      break;

    case 3:
      if (cardFields[2]) {
        cardFields[2].children[1].innerHTML = value;
      }
      break;

    case 4:
      if (cardFields[3]) {
        cardFields[3].innerHTML = value;
      }
      break;
  }
}