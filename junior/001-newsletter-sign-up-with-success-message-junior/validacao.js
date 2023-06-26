let form = document.querySelector("form"),
    emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    condicao = false;

form.addEventListener("submit", event => {
    event.preventDefault();
})

form[0].addEventListener("input", validacao);
form[1].addEventListener("click", enviar);


function validacao(event){
    if (event.target.value.match(emailFormat)){
        mudarEstado(true)
    }else{
        mudarEstado(false)
    }
}

function mudarEstado(validade){
    let msg = document.querySelector(".errorMsg");
    console.log(msg);
    if(validade === true){
        msg.classList.add("displayNone");
        condicao = true;
    }else{
        msg.classList.remove("displayNone");
        condicao = false;
    }
}

function enviar(){
    if(condicao === true){
        window.location.href = "success.html";
    }else{
        mudarEstado(false)
    }
}