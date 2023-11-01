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
    let larguraAtualJanela = updateWindowWidth();
    if(larguraAtualJanela >= 64){
        closeMenu();
    }
}

function updateWindowWidth(){
    let larguraJanela = window.innerWidth;
    larguraJanela = larguraJanela/16;
    return larguraJanela;
}

window.addEventListener("resize", verifyMenu);

verifyMenu();