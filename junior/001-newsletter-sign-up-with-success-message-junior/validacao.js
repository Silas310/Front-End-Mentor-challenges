let form = document.querySelector("form"),
    emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

form.addEventListener("submit", event => {
    event.preventDefault();
})

form[0].addEventListener("input", validacao);


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
    }else{
        msg.classList.remove("displayNone");
    }
}