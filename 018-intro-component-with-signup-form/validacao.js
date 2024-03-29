let form = document.querySelector("form"),
    validationSum = 0,
    divs = document.querySelectorAll("div.input-box"),
    emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    validation = false;

form.addEventListener("submit", event => {
    event.preventDefault();
});

for(let i = 0; i < form.length - 1; i++){
    form[i].addEventListener("input", validacao);
}

form[4].addEventListener("click", enviar);

function validacao(event){
    let index = null;
    switch(event.target.id){
        case "first-name":
            index = 0;
            break;
        case "last-name":
            index = 1;
            break;
        case "email-add":
            index = 2;
            break;
        case "password":
            index = 3;
            break;
    }

    let input = divs[index].children[0],
        img = divs[index].children[1],
        errorMsg = divs[index].children[2];
    if((event.target.value.match(emailFormat) && index === 2) || 
        (event.target.value != "" && index != 2)){    
        mudarEstado(input, img, errorMsg, true);
    }else{
        mudarEstado(input, img, errorMsg, false);
    }
    /*switch(index){
        case 2:
            if(event.target.value.match(emailFormat)){    
                mudarEstado(input, img, errorMsg, true);
            }else{
                mudarEstado(input, img, errorMsg, false);
            }
            break;
        case 0:
        case 1:
        case 3:
            if(event.target.value != ""){      
                mudarEstado(input ,img, errorMsg, true);
            }else{
                mudarEstado(input ,img, errorMsg, false);
            }
            break;
    }*/
}

function mudarEstado(entrada ,imagem, mensagem, validade){
    if (validade === true){
        entrada.classList.remove("error-border");
        imagem.setAttribute("class", "displayNone");
        mensagem.classList.add("displayNone");
    }else{
        entrada.classList.add("error-border");
        imagem.removeAttribute("class", "displayNone");
        mensagem.classList.remove("displayNone");
    }
}

function enviar(){
    let contador = 0;
    for(let i = 0; i < 4; i++){
        if( divs[i].children[2].classList.contains("displayNone") && divs[i].children[0].value != ""){
            contador++;
        }else{
            if(contador > 0){
                contador--;
            }
        }
    }
    if(contador === 4){
        location.reload();
    }else{
        alert("Insira os dados")
    }
}