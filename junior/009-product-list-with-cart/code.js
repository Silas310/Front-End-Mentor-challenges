let storedData = []; 


async function loadData() {
  try {
    let response = await fetch("data.json");
    storedData = await response.json(); 

    renderDesserts();
    addButtonListeners();
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}


loadData();


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

      <div class="desserts__button-container">
        <svg class="desserts__button--decrement" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 10 2">
          <path class="path" fill="#fff" d="M0 .375h10v1.25H0V.375Z"/>
        </svg>
      </div>

      <div class="desserts__counter">1</div>

      <div class="desserts__button-container">
        <svg class="desserts__button--increment" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 10 10">
          <path class="path" fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
        </svg>
      </div>
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
  document.querySelectorAll(".desserts__button--add").forEach(button => {
    button.addEventListener("click", manageButtons);
  });

  document.querySelectorAll(".desserts__button--increment").forEach(button => {
    button.addEventListener("click", manageButtons);
  });

  document.querySelectorAll(".desserts__button--decrement").forEach(button => {
    button.addEventListener("click", manageButtons);
  });
}


function manageButtons(event) {
  let button = event.currentTarget;
  let classList = button.classList;
  let counter = button.closest(".desserts__button").children[1];
  let image = button.closest(".desserts__item").querySelector(".desserts__image");
  let dessertName;
  switch (classList[0]) {
    case "desserts__button--add":
      let dessertInfo = button.nextElementSibling.nextElementSibling;
      dessertName = dessertInfo.children[1];
      let dessertPrice = dessertInfo.children[2];

      changeButtonClass(button, "adding");
      selectImage(image);
      increaseCartCounter();
      addToCart(dessertName, dessertPrice);
      break;

    case "desserts__button--increment":
      // dessertName = button.closest(".desserts__item").querySelector(".desserts__title");
      counter.innerHTML = Number(counter.innerHTML) + 1;
      increaseCartCounter();
      manageItemQuantity(button);
      break;

    case "desserts__button--decrement":
      decreaseCartCounter();
      if (Number(counter.innerHTML) > 1) {
        counter.innerHTML = Number(counter.innerHTML) - 1;
      } else {
        let dessertName = button.closest(".desserts__button").nextElementSibling.children[1];

        changeButtonClass(button, "removing");
        deselectImage(image);
        removeFromCart(dessertName);
      }
      manageItemQuantity(button);
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
      let counterBtn = button.parentElement.parentElement; // Counter btn
      let addBtn = counterBtn.previousElementSibling; // Add to cart btn

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


function increaseCartCounter() {
  let counter = document.querySelector(".cart__quantity");

  counter.innerHTML = Number(counter.innerHTML) + 1;
}


function decreaseCartCounter() {
  let counter = document.querySelector(".cart__quantity");
  
  counter.innerHTML = Number(counter.innerHTML) -1;
}


function addToCart(name, price) {
  let list = document.querySelector(".cart__list"); // ul
  let item = document.createElement("li"); // li

  item.classList.add("cart__item");

  
  item.innerHTML = `
    <h3 class="cart__item-name">${name.innerText}</h3>
    <span class="cart__item-counter">
      <span class="cart__item-quantity">1</span>x
    </span>

    <span class="cart__item-price">@ ${price.innerText}</span>

    <span class="cart__item-price--multiplied"></span>
  `;

  list.appendChild(item);
}


function removeFromCart(name) {
  let list = document.querySelector(".cart__list");

  for (let element of list.children) {
    let itemName = element.querySelector(".cart__item-name").innerText;

    if (itemName === name.innerText) {
      list.removeChild(element);
      break; 
    }
  }
}


function manageItemQuantity(btn) { 
  let buttonQuantity = btn.closest(".desserts__button").querySelector(".desserts__counter"); // from button
  let itemName = btn.closest(".desserts__item").querySelector(".desserts__title").innerText; // item name text
  let list = document.querySelector(".cart__list"); // ul

  console.log(buttonQuantity)
  for (let element of list.children) {
    if (itemName == element.children[0].innerText) {
      let cartItemQuantity = element.querySelector(".cart__item-quantity"); 

      console.log(cartItemQuantity);
      cartItemQuantity.innerText = buttonQuantity.innerText;
    }
  }
}