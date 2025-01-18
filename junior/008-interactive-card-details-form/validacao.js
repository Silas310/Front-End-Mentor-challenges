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
      let msg = isNameValid(input);
      
      break;
  }


  // writeCard(inputIndex, input.value);
}


function isNameValid(input) {
  if (input.value.trim() == "") {
    // console.log("branco");
    let msg = "Can't be blank"
    showError(input, msg);
    return false;
  }
  console.log("FOI");
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