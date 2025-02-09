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
});


function renderDesserts() {
  const container = document.querySelector(".desserts");
  

  storedData.forEach(item => {
    let div = document.createElement("div");

    div.classList.add("dessert__item");
    
    div.innerHTML = `
      <div class="desserts__image-container">
        <img src="${item.image.thumbnail}" alt="${item.name}" class="desserts__image">
        <button class="desserts__button">Add to Cart</button>
      </div>
      <div class="desserts__info">
        <p class="desserts__category">${item.category}</p>
        <h3 class="desserts__title">${item.name}</h3>
        <p class="desserts__price">$${item.price.toFixed(2)}</p>
      </div>
    `;

    container.appendChild(div);
  });
}
