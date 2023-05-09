let 
    form = document.getElementById("ratingForm"),
    submit = document.getElementById("submit-btn"),
    botoesSel = [];

// alert(form.children[i].id)


function selecaoElemento(id){
    if(botoesSel.length === 1){
        document.getElementById(botoesSel[0]).classList.remove("selecionado");
        botoesSel.pop()
    }
    if (botoesSel.length === 0){ // Botoes selecionados (adiciona apenas se nenhum botão estiver selecionado)
        botoesSel.push(id); // Adiciona a lista de selecionados
        document.getElementById(id).classList.add("selecionado") //Add bg
    }
}

function avaliadorNota(){
    console.log("oi")
        
}