let form = document.querySelectorAll("form"),
    labels = document.querySelectorAll("label");


form[0].addEventListener("submit", event =>{
    event.preventDefault();
})

/*for(let i = 0; i < 3; i++){
    form[0][i].addEventListener("input", verificacao);
}*/


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