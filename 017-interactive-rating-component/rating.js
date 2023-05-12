let 
    form = document.getElementById("ratingForm"),
    submit = document.getElementById("submit-btn"),
    rating = document.getElementById("rating"),
    main = document.getElementById("main-rating"),
    thanks = document.getElementById("main-thanks"),
    botoesSel = [];


form.addEventListener('submit', event =>{
    event.preventDefault();
})


function selecaoElemento(id){
    do{
        if(botoesSel.length === 1){            
            if(id === botoesSel[0]){ // Se botao clicado ja esta sel
                document.getElementById(botoesSel[0]).classList.remove("selecionado");
                botoesSel.pop()
                break
            }
            document.getElementById(botoesSel[0]).classList.remove("selecionado");
            botoesSel.pop()
        }else if (botoesSel.length === 0){ // Botoes selecionados (adiciona apenas se nenhum botão estiver selecionado)
            botoesSel.push(id); // Adiciona a lista de selecionados
            document.getElementById(id).classList.add("selecionado") //Add bg
        }
    }
    while(botoesSel.length !== 1) // Exc o codigo enquanto btn n for selecionado
    /* do-while adiciona a possibilidade de trocar o botão sem ter que
    desmarcar o botão ja selecionado */
}


function avaliadorNota(event){
    if(botoesSel.length === 0){ // Se valor nao foi selecionado
        alert("selecione um valor")            
    }else{
        main.style.display = "none"
        /*thanks.classList.add("display")*/
        thanks.style.display = "flex"
        rating.innerHTML = `You selected ${botoesSel[0][4]} out of 5`
    }
}