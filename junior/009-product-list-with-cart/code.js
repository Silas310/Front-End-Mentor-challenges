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
      <img src="assets/images/icon-decrement-quantity.svg" alt="Decrement icon" class="desserts__button--decrement">
      <div class="desserts__counter">1</div>
      <img src="assets/images/icon-increment-quantity.svg" alt="Increment icon" class="desserts__button--increment">
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
      changeButtonClass(button, "adding");
      break;

    case "desserts__button--increment":
      counter.innerHTML = Number(counter.innerHTML) + 1;
      break;

    case "desserts__button--decrement":
      if (Number(counter.innerHTML) > 1) {
        counter.innerHTML = Number(counter.innerHTML) - 1;
      } else {
        changeButtonClass(button, "removing");
      }
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