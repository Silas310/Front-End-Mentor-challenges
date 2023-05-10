let 
    form = document.getElementById("ratingForm"),
    submit = document.getElementById("submit-btn"),
    rating = document.getElementById("rating"),
    botoesSel = [];

function selecaoElemento(id){
    if(botoesSel.length === 1){
        document.getElementById(botoesSel[0]).classList.remove("selecionado");
        botoesSel.pop()
    }else if (botoesSel.length === 0){ // Botoes selecionados (adiciona apenas se nenhum botão estiver selecionado)
        botoesSel.push(id); // Adiciona a lista de selecionados
        document.getElementById(id).classList.add("selecionado") //Add bg
    }
}


/*function avaliadorNota(){
    showMSG(botoesSel[0][4])
}*/


/*function showMSG(nota){
    rating.innerText = 'tchau'
}*/