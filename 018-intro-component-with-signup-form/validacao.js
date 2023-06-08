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

    let img = divs[index].children[1],
        errorMsg = divs[index].children[2];
    switch(index){
        case 2:
            if(event.target.value.match(emailFormat)){      
                img.setAttribute("class", "displayNone");
                errorMsg.classList.add("displayNone");
            }else{
                img.removeAttribute("class", "displayNone");
                errorMsg.classList.remove("displayNone");
            }
            break;
        case 0:
        case 1:
        case 3:
            if(event.target.value != ""){      
                img.setAttribute("class", "displayNone");
                errorMsg.classList.add("displayNone");
            }else{
                img.removeAttribute("class", "displayNone");
                errorMsg.classList.remove("displayNone");
            }
            break;
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