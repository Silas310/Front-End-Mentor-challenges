let form = document.querySelector("form"),
    validationSum = 0,
    divs = document.querySelectorAll("div.input-box");

form.addEventListener("submit", event => {
    event.preventDefault();
});

for(let i = 0; i < form.length - 1; i++){
    form[i].addEventListener("input", campoInvalido);
    

}

function campoInvalido(event){
    if(event.target.id === "email-add"){
        let img = divs[2].children[1];
        if(event.target.value.match()){
            validationSum++;
            img.setAttribute("class", "displayNone")
        }else{
            validationSum--;
            img.removeAttribute("class", "")
            
        }



    }else{

    }
}



/*/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/*/