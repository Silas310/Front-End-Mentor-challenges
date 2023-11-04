function openMenu(){
    let menu = document.querySelector("#menu-items-container");
    menu.style.display = "flex";
    document.body.style.backgroundColor = "rgb(0,0,0, 0.4)";
}

function closeMenu(){
    let menu = document.querySelector("#menu-items-container");
    menu.style.display = "none";
    document.body.style.backgroundColor = "white";
}

function verifyMenu(){
    let larguraAtualJanela = updateWindowWidth(),
        menu = document.querySelector("#menu-items-container");
    if(larguraAtualJanela >= 64){
        closeMenu();
        menu.style.display = "flex";
    }else if(larguraAtualJanela < 64){
        menu.style.display = "none";
        document.body.style.backgroundColor = "white";
    }
}

function updateWindowWidth(){
    let larguraJanela = window.innerWidth;
    larguraJanela = larguraJanela/16;
    return larguraJanela;
}

window.addEventListener("resize", verifyMenu);

verifyMenu();