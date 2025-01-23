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
      }
      break;

    case 1:
      if (isCardNumberValid(input)) {
        writeCard(inputIndex, input.value);
      }
      break;

    case 2:
      if (isMonthValid(input)) {
        writeCard(inputIndex, input.value);
      }
      break;

    case 3:
      if (isYearValid(input)) {
        writeCard(inputIndex, input.value);
      }
      break;

    case 4:
      if (isCvcValid(input)) {
        writeCard(inputIndex, input.value);
      } else {
        console.log("ERRO");
      }
      break;
  }


  // writeCard(inputIndex, input.value);
}


function isNameBlank(input) {
  if (input.value.trim() == "") {
    showError(input, "Can't be blank");
    return false;
  }
  return true;
}


function isNameLengthValid(input) {
  let length =  input.value.trim().length;
  if (length > 25 ) {
    showError(input, "The name must be 25 characters or fewer")
    return false;
  }
  return true;
}


function isCardNumberValid(input) {
  let number = input.value;
  console.log(number.length)
  if (number.length < 1 || number.length > 16 ) {
    showError(input, "Only 16 digits allowed");
    return false;
  }
  return true;
}


function isMonthValid(input) {
  let month = input.value;
  if (month.length < 1 || month > 12) {
    showError(input, "Invalid month. Please enter a value between 01 and 12");
    return false;
  }
  return true;
}


function isYearValid(input) {
  let year = input.value;
  if (year.length == 2 && year < 25) {
    showError(input, "Invalid year. Must be 25 or higher");
    return false;
  }
  if (year.length >= 3) {
    showError(input, "Invalid year");
    return false;
  }
  return true;
}


function isCvcValid(input) {
  if (input.value.length < 4) {
    return true;
  }
  showError(input, "Invalid format");
  return false;
}


function showError(input, msg) {
  let id =  input.id;
  console.log(input);

  switch (id) {
    case "cardholder-name":
      input.classList.add("input-error");
      errorMSGs[0].classList.remove("display-none");
      errorMSGs[0].innerHTML = msg;
      break;
  
    case "card-number":
      input.classList.add("input-error");
      errorMSGs[1].classList.remove("display-none");
      errorMSGs[1].innerHTML = msg;
      break;
    case "exp-month":
      input.classList.add("input-error");
      errorMSGs[2].classList.remove("display-none");
      errorMSGs[2].innerHTML = msg;
      break;
    case "exp-year":
      input.classList.add("input-error");
      errorMSGs[2].classList.remove("display-none");
      errorMSGs[2].innerHTML = msg;
      break;
    case "cvc-number":
      input.classList.add("input-error");
      errorMSGs[3].classList.remove("display-none");
      errorMSGs[3].innerHTML = msg;
      break;

  }
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