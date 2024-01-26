function controlarMenu() {
  let largura = atualizarLargura(),
      nav = document.querySelector(".header__items");

  if (largura < 64) {
    if ( verificarStatusMenu(nav) == false) {
      abrirMenu(nav);
    } else {
      fecharMenu(nav);
    }
  }

}

function abrirMenu(nav) {
  nav.classList.remove("header__items_not-displayed");
}

function fecharMenu(nav) {
  nav.classList.add("header__items_not-displayed");
}


function verificarStatusMenu(nav) {
  if ( nav.classList.contains("header__items_not-displayed") ) {
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