let form = document.querySelector("form");
let inputs = document.querySelectorAll("form input");
let errorMSGs = document.querySelectorAll(".error-msg");


for (let input of inputs) {
  if (input.type !== "submit") {  
    input.addEventListener("input", validateInput);
  } 
}


form.addEventListener('submit', event =>{
  event.preventDefault();
})


inputs[5].addEventListener("click", validateForm);


inputs[1].addEventListener("input", (event) => {
  const input = event.target;
  
  let value = input.value.replace(/\D/g, '');
  
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
  
  input.value = value;
  
  validateInput(event);
});


function validateForm(){
  let isValid = true;

  inputs.forEach((input) => {
    validateInput({ target: input }); // Reutiliza a função existente
    if (input.classList.contains("input-error")) isValid = false;
  });

  if (isCardNumberValid(inputs[1]) == false) {
    showError(inputs[1], "16 digits only");
    isValid = false;
  }
  
  if (isValid) {
    document.querySelector(".form-container").classList.add("form-container-complete-state");
    form.classList.add("display-none");
    document.querySelector(".confirmation-container").classList.remove("display-none");
  }
}


function validateInput(event) {
  const input = event.target;
  const inputIndex = Array.from(inputs).indexOf(input);
  
  
  switch (inputIndex) {
    case 0:
      if (isNotBlank(input) && isNameLengthValid(input) && isNameValid(input) ) {
        hideError(input);
        writeCard(inputIndex, input.value);
      }
      break;
      
    case 1:
      if (true) {
        hideError(input);
        writeCard(inputIndex, input.value);
      }
      break;
        
    case 2:
      if (isMonthValid(input)) {
        hideError(input);
        writeCard(inputIndex, input.value);
      }
      break;
          
    case 3:
      if (isYearValid(input)) {
        hideError(input);
        writeCard(inputIndex, input.value);
      }
      break;
      
    case 4:
      if (isCvcValid(input)) {
        hideError(input);
        writeCard(inputIndex, input.value);
      }
      break;
  }
      
      
      // writeCard(inputIndex, input.value);
}
    
    
function isNotBlank(input) {
  if (input.value.trim() == "") {
    showError(input, "Can't be blank");
    return false;
  }
  return true;
}


function isNameValid(input) {
  let name = input.value;
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    showError(input, "Letters only, no numbers or symbols allowed ");
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
  let length = input.value.length;
  if (length !== 19) {
    return false;
  }
}


function isMonthValid(input) {
  let month = input.value;
  if (month.length < 1 || month > 12 || isNaN(month)) {
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
  hideError(input);
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
          function validateForm(){}
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


function hideError(input) {
  let errorIndex = Array.from(inputs).indexOf(input);
  if (errorIndex == 3 || errorIndex == 4) --errorIndex;
  
  if (errorIndex !== undefined && errorIndex < errorMSGs.length) {
    input.classList.remove("input-error");
    errorMSGs[errorIndex].classList.add("display-none");
    errorMSGs[errorIndex].innerHTML = "";
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