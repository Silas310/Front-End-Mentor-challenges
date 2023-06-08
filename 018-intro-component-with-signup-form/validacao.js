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
    let index = null;
    switch(event.target.id){
        case "first-name":
            index = 0;
            break
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
    if(index === 2){

    }else{

    }

    let img = divs[index].children[1],
        errorMsg = divs[index].children[2];
    if(event.target.value.match(emailFormat) || !(event.target.value === "")){
        img.setAttribute("class", "displayNone");
        errorMsg.classList.add("displayNone");
    }else{
        img.removeAttribute("class", "");
        errorMsg.classList.remove("displayNone");
    }
    
    
}
