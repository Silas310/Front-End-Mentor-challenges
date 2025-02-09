let storedData = []; 

async function loadData() {
  try {
    let response = await fetch("data.json");
    storedData = await response.json(); 
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

loadData();