function verifyMenu(){
  let nav = document.querySelector(".header__nav-list"),
      auths = document.querySelector(".header__auth-links"),
      windowWidth = updateWindowWidth();

  if (nav.style.display == "none") {
    openMenu(nav, auths);
  }else{
    closeMenu(nav, auths);
  }

}

function openMenu(nav, auths){
  nav.style.display = "block";
  auths.style.display = "block";
}

function closeMenu(nav, auths){
  nav.style.display = "none";
  auths.style.display = "none";
}

function updateWindowWidth(){
  let larguraJanela = window.innerWidth;
  larguraJanela = larguraJanela/16;
  return larguraJanela;
}


document.querySelector(".header__menu-icon").addEventListener("click", verifyMenu);