let form = document.querySelectorAll("form"),
    labels = document.querySelectorAll("label");
const data = new Date();


form[0].addEventListener("submit", event =>{
    event.preventDefault();
})

for(let i = 0; i < 3; i++){
    form[0][i].addEventListener("input", verificacao);
}

form[0][3].addEventListener("click", enviar);


function verificacao(event, id = event.target.id){
    let diasDisponiveis,
        elemento = document.getElementById(id),
        statusAtual = false;
    console.log(id)
    switch(id){
        case "input-day":
            if( elemento.value < 0 || 
                elemento.value > 31 || 
                elemento.value > diasDisponiveis){
                mudarEstado(false, 0);
                statusAtual = false
            }else{ mudarEstado(true, 0); statusAtual = true;}
            break;
        case "input-month":
            if(elemento.value < 0 ||
                elemento.value > 12){
                    mudarEstado(false, 1);
                    statusAtual = false;
                }else{ mudarEstado(true, 1); statusAtual = true;}
            break;
        case "input-year":
            if(elemento.value < 0 || 
                elemento.value > 2023){
                    mudarEstado(false, 2);
                    statusAtual = false;
            }else{ mudarEstado(true, 2); statusAtual = true;}
        break;         
    }
}


function mudarEstado(validade, index){
    if(validade === true){
        labels[index].classList.remove("error-color");
        form[0][index].classList.remove("error-border");
        form[0].children[index].children[2].
        classList.add("displayNone");
    }else{
        labels[index].classList.add("error-color");
        form[0][index].classList.add("error-border");
        form[0].children[index].children[2].
        classList.remove("displayNone");
    }
}


function enviar(){
    verificacao("input-day");
}