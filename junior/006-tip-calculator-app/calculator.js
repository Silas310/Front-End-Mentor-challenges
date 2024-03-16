let billInput = document.querySelector(".bill-input");
let tipBtn = document.querySelectorAll(".btn");
let customInput = document.querySelector(".tip-input");
let peopleInput = document.querySelector(".people-input");
let results = document.querySelectorAll(".result");

function storeValues(e) {
  let values = [];
  console.log(e.target);
}

billInput.addEventListener("input", storeValues);
for (let i = 0; i < tipBtn.length; i++) {
  let item = tipBtn[i].addEventListener("click", storeValues);
}
customInput.addEventListener("input", storeValues);
peopleInput.addEventListener("input", storeValues);