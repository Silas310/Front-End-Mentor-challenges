function controlarMenu() {
  let largura = atualizarLargura(),
      nav = document.querySelector(".header__nav-list"),
      auths = document.querySelector(".header__auth-links");

  if (largura < 64) {
    if ( verificarStatusMenu(nav, auths) == false) {
      abrirMenu(nav, auths);
    } else {
      fecharMenu(nav, auths);
    }
  }

}


function abrirMenu(nav, auths) {
  nav.classList.remove("header__nav-list_not-displayed");
  auths.classList.remove("header__auth-links_not-displayed");
}

function fecharMenu(nav, auths) {
  nav.classList.add("header__nav-list_not-displayed");
  auths.classList.add("header__auth-links_not-displayed");
}


function verificarStatusMenu(nav, auths) {
  if ( ( nav.classList.contains("header__nav-list_not-displayed") ) && 
  ( auths.classList.contains("header__auth-links_not-displayed") ) ) {
    return false;
  } else {
    return true;
  }
}


function atualizarLargura() {
  let larguraJanela = window.innerWidth;
  larguraJanela = larguraJanela/16;
  return larguraJanela;
}

document.querySelector(".header__menu-icon")
.addEventListener("click", controlarMenu);