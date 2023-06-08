let form = document.querySelector("form"),
    validationSum = 0,
    divs = document.querySelectorAll("div.input-box"),
    emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

form.addEventListener("submit", event => {
    event.preventDefault();
});

for(let i = 0; i < form.length - 1; i++){
    form[i].addEventListener("input", campoInvalido);
    

}

function campoInvalido(event){
    if(event.target.id === "email-add"){
        let img = divs[2].children[1],
            errorMsg = divs[2].children[2];
        if(event.target.value.match(emailFormat)){
            validationSum++;
            img.setAttribute("class", "displayNone");
            errorMsg.classList.add("displayNone");
        }else{
            validationSum--;
            img.removeAttribute("class", "");
            errorMsg.classList.remove("displayNone"); 
        }
    }else{

    }
}



/*/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/*/