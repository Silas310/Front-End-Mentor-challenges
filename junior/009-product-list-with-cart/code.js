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
      <button class="desserts__button desserts__button--add">Add to Cart</button>

      <button class="desserts__button desserts__button--hidden desserts__button--counter">
      <img src="assets/images/icon-decrement-quantity.svg" alt="Decrement icon">
      <div>1</div>
      <img src="assets/images/icon-increment-quantity.svg" alt="Increment icon">
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
  if (classList[1] == "desserts__button--add") {
    changeButtonClass(button, "adding");
  }
}


function changeButtonClass(button, caso) {
  let nextElement = button.nextElementSibling;
  switch (caso) {
    case "adding":
      button.classList.add("desserts__button--hidden");
      nextElement.classList.remove("desserts__button--hidden");
      break;
  }
}