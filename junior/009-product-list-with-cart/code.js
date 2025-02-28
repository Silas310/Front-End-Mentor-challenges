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
      manageCartBackground();
      manageCartMessage();
      multiplyItemValue(button);

      let list = document.querySelector(".cart__list")
      if (list.children.length == 1) {
        manageCartTotalRenderer();
        manageCarbonNeutralMessage();
        manageConfirmButton();
      }
      break;

    case "desserts__button--increment":
      // dessertName = button.closest(".desserts__item").querySelector(".desserts__title");
      increaseButtonCounter(counter);
      increaseCartCounter();
      manageItemQuantity(button);
      multiplyItemValue(button);
      break;

    case "desserts__button--decrement":
      decreaseCartCounter();
      if (Number(counter.innerHTML) > 1) {
        
        decreaseButtonCounter(counter);
      } else {
        let dessertName = button.closest(".desserts__button").nextElementSibling.children[1];

        changeButtonClass(button, "removing");
        deselectImage(image);
        removeFromCart(dessertName);
        manageCartBackground();
        manageCartMessage();
        manageCartTotalRenderer();
        manageCarbonNeutralMessage();
        manageConfirmButton();
      }
      manageItemQuantity(button);
      multiplyItemValue(button);
      break;
  }
  calculateTotal();
}


function increaseButtonCounter(counter) {
  counter.innerHTML = Number(counter.innerHTML) + 1;
}


function decreaseButtonCounter(counter) {
  counter.innerHTML = Number(counter.innerHTML) - 1;
}


function changeButtonClass(button, caso) {
  switch (caso) {
    case "adding":
      let nextElement = button.nextElementSibling;
      button.classList.add("desserts__button--hidden");
      nextElement.classList.remove("desserts__button--hidden");
      break;

    case "removing":
      let counterBtn = button.closest(".desserts__button"); // Counter btn
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
    <div class="cart__item-info">
      <h3 class="cart__item-name">${name.innerText}</h3>
      <span class="cart__item-counter">
        <span class="cart__item-quantity">1</span>x
      </span>
      <span class="cart__item-price">@ ${price.innerText}</span>
      <span class="cart__item-price--multiplied"></span>
    </div>
    <div>
      <img  class="cart__item-remove" src="assets/images/icon-remove-item.svg" alt="Remove icon">
    </div>
  `;

  item.querySelector(".cart__item-remove").addEventListener("click", removeItem);

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

  for (let element of list.children) {
    if (itemName == element.querySelector(".cart__item-name").innerText) {
      let cartItemQuantity = element.querySelector(".cart__item-quantity"); 

      cartItemQuantity.innerText = buttonQuantity.innerText;
    }
  }
}


function manageCartBackground() {
  let cart = document.querySelector(".cart");
  let list = document.querySelector(".cart__list");

  if (list.children.length) {
    cart.style.background = "var(--color-white)";
  } else {
    cart.style.background = "var(--color-white) url(assets/images/illustration-empty-cart.svg) no-repeat center / auto";
  }
}


function manageCartMessage() {
  let message = document.querySelector(".cart__empty-message");
  let list = document.querySelector(".cart__list");

  if (list.children.length) {
    message.style.display = "none";
  } else {
    message.style.display = "block";
  }
}


function removeItem(event) {
  let btn = event.currentTarget;
  let listItem = btn.closest(".cart__item"); // li


  let itemName = listItem.querySelector(".cart__item-name"); // no name
  let desserts = document.querySelector(".desserts");
  let itemNames = desserts.querySelectorAll(".desserts__title"); // all item names

  
  
  for (const element of itemNames) {
    if (itemName.innerText == element.innerText) {
      let dessert = element.closest(".desserts__item");

      let img =  dessert.querySelector(".desserts__image");
      deselectImage(img);

      let buttonCounter = dessert.querySelector(".desserts__counter");
      let counterValue = Number(buttonCounter.innerText);
      for (let i = 0; i < counterValue - 1; i++) {
        decreaseButtonCounter(buttonCounter);
      }

      let counterButton = dessert.querySelector(".desserts__button--counter");
      changeButtonClass(counterButton, "removing")
    }
  }

  let itemQuantity = listItem.querySelector(".cart__item-quantity").innerText;
  let cartQuantity = document.querySelector(".cart__quantity");
  cartQuantity.innerText = Number(cartQuantity.innerText - itemQuantity);

  listItem.remove();
  
  calculateTotal()
  manageConfirmButton()
  manageCartTotalRenderer();
  manageCarbonNeutralMessage()
  manageCartBackground();
  manageCartMessage();
}


function manageCartTotalRenderer() {
  let list = document.querySelector(".cart__list");
  let cart = document.querySelector(".cart");

  let cartTotal = cart.querySelector(".cart__total");

  if (list.children.length && !cartTotal) {
    cartTotal = document.createElement("div");
    cartTotal.classList.add("cart__total");

    cartTotal.innerHTML = `
      <p class="cart__total-label">Order Total:</p>
      <p class="cart__total-price">$0.00</p>
    `;

    cart.appendChild(cartTotal);
  } else if (!list.children.length && cartTotal) {
    cartTotal.remove();
  }
}


function manageCarbonNeutralMessage() {
  let list = document.querySelector(".cart__list");
  let cart = document.querySelector(".cart");
  let carbonMsg = cart.querySelector(".cart__carbon-neutral-container");
  
  if (list.children.length && !carbonMsg) {
    carbonMsg = document.createElement("div");
    carbonMsg.classList.add("cart__carbon-neutral-container")
    carbonMsg.innerHTML = `
      <img src="assets/images/icon-carbon-neutral.svg" alt="Tree icon" class="cart__carbon-neutral-image">
      <p class="cart__carbon-neutral-msg">This is a <strong>carbon-neutral</strong> delivery</p>
    `;
    cart.appendChild(carbonMsg);
  } else if (!list.children.length && carbonMsg) {
    carbonMsg.remove();
  }
}


function manageConfirmButton() {
  let list = document.querySelector(".cart__list");
  let cart = document.querySelector(".cart");
  let confirmButton = cart.querySelector(".cart__button"); 

  if (list.children.length && !confirmButton) {
    confirmButton = document.createElement("button");
    confirmButton.classList.add("desserts__button");
    confirmButton.classList.add("cart__button");
    confirmButton.innerHTML = "Confirm Order";

    cart.appendChild(confirmButton);
  } else if(!list.children.length && confirmButton) {
    confirmButton.remove();
  }
}


function multiplyItemValue(btn) {
  let itemName = btn.closest(".desserts__item").querySelector(".desserts__title"); // no
  let list = document.querySelector(".cart__list");

  
  for (const element of list.children) {
    if (itemName.innerText == element.children[0].children[0].innerText) {
      let unitPrice = Number( element.querySelector(".cart__item-price").innerText.slice(3) );
      let multiplier = Number( element.querySelector(".cart__item-quantity").innerText );
      let place = element.querySelector(".cart__item-price--multiplied");
      let result = unitPrice * multiplier;
      result = result.toFixed(2);

      addMultipliedValue(result, place);
    }
  }
}


function addMultipliedValue(value, place) {place.innerHTML = `$${value}`}


function calculateTotal() {
  let values = document.querySelectorAll(".cart__item-price--multiplied");
  let total = 0;

  for (const element of values) {
    total += Number(element.innerText.slice(1));
  }

  console.log(total.toFixed(2));
  showTotal(total)
}


function showTotal(total) {
  let totalElement = document.querySelector(".cart__total-price");

  if (totalElement) {
    totalElement.innerHTML = `$${total.toFixed(2)}`;
  }
}


function openModal() {
  
}