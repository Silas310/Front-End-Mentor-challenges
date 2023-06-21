let form = document.querySelector("form"),
    emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

form.addEventListener("submit", event => {
    event.preventDefault();
})

console.log(form[0])
form[0].addEventListener("input", validacao);


function validacao(event){
    if (event.target.value.match(emailFormat)){
        mudarEstado(true)
    }else{
        mudarEstado(false)
    }
}

function mudarEstado(validade){
    if(validade === true){
        
    }else{

    }
}