let storedData = []; 


async function loadData() {
  try {
    let response = await fetch("data.json");
    storedData = await response.json(); 
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}


loadData().then( () => {
  renderDesserts();
  addButtonListeners();
});


function renderDesserts() {
  const container = document.querySelector(".desserts");
  

  storedData.forEach(item => {
    let div = document.createElement("div");

    div.classList.add("desserts__item");
    
    div.innerHTML = `
      <picture class="desserts__image-container">
        <source srcset="${item.image.mobile}" media="(min-width: 23.4375em)">
        <source srcset="${item.image.tablet}" media="(min-width: 35em) and (max-width: 90em)">
        <source srcset="${item.image.desktop}" media="(min-width: 90em)">
        <img src="${item.image.thumbnail}" alt="${item.name}" class="desserts__image">
      </picture>
      <button class="desserts__button--add desserts__button">Add to Cart</button>

      <button class="desserts__button desserts__button--hidden desserts__button--counter">
      <svg class="desserts__button--decrement" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
      <div class="desserts__counter">1</div>
      <svg class="desserts__button--increment" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
      </button>

      <div class="desserts__info">
        <p class="desserts__category">${item.category}</p>
        <h3 class="desserts__title">${item.name}</h3>
        <p class="desserts__price">$${item.price.toFixed(2)}</p>
      </div>
    `;
    container.appendChild(div);
  });
}


function addButtonListeners() {
  let buttons = document.querySelectorAll(".desserts__button");
  buttons.forEach((button) => {
    button.addEventListener("click", manageButtons);
  });
}


function manageButtons(event) {
  let button = event.target;
  let classList = button.classList;
  let counter = button.parentElement.querySelector(".desserts__counter");
  switch (classList[0]) {
    case "desserts__button--add":
      let image = button.parentElement.querySelector(".desserts__image");
      changeButtonClass(button, "adding");
      selectImage(image);
      increaseCounter();
      break;

    case "desserts__button--increment":
      counter.innerHTML = Number(counter.innerHTML) + 1;
      increaseCounter();
      break;

    case "desserts__button--decrement":
      if (Number(counter.innerHTML) > 1) {
        counter.innerHTML = Number(counter.innerHTML) - 1;
      } else {
        let image = button.parentElement.parentElement.querySelector(".desserts__image");
        changeButtonClass(button, "removing");
        deselectImage(image);
      }
      decreaseCounter();
      break;
  }
}


function changeButtonClass(button, caso) {
  switch (caso) {
    case "adding":
      let nextElement = button.nextElementSibling;
      button.classList.add("desserts__button--hidden");
      nextElement.classList.remove("desserts__button--hidden");
      break;
    case "removing":
      let counterBtn = button.parentElement; // Counter btn
      let addBtn = button.parentElement.previousElementSibling; // Add to cart btn

      addBtn.classList.remove("desserts__button--hidden");
      counterBtn.classList.add("desserts__button--hidden")
      break;
  } 
}


function selectImage(img) {
  img.classList.add("desserts__image--selected");
}

function deselectImage(img) {
  img.classList.remove("desserts__image--selected");
}


function increaseCounter() {
  let counter = document.querySelector(".cart__quantity");

  counter.innerHTML = Number(counter.innerHTML) + 1;
}


function decreaseCounter() {
  let counter = document.querySelector(".cart__quantity");
  
  counter.innerHTML = Number(counter.innerHTML) -1;
}