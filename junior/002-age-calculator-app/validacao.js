let form = document.querySelectorAll("form"),
    labels = document.querySelectorAll("label");


form[0].addEventListener("submit", event =>{
    event.preventDefault();
})

for(let i = 0; i < 3; i++){
    form[0][i].addEventListener("input", verificacao);
}

function verificacao(event){
    let id = event.currentTarget.id,
        elemento = document.getElementById(id),
        validity = null,
        index = null;
    switch(id){
        case "input-day":
            if( elemento.value < 0 || 
                elemento.value > 31){
                validity = false;
                index = 0;
            }else{
                validity = true;
                index = 0;
            }
            break;
        case "input-month":
            if( elemento.value < 0 || 
                elemento.value> 12){
                validity = false;
                index = 1;
            }else{
                validity = true;
                index = 1
            }
            break;
        case "input-year":
            if( elemento.value > 2023 || 
                elemento.value < 0){
                validity = false;
                index = 2;
            }else{
                validity = true;
                index = 2;
            }
            break;
    }
    mudarEstado(validity, index);

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
