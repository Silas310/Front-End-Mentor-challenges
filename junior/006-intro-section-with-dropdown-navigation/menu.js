function controlarMenu() {
  let largura = atualizarLargura(),
      nav = document.querySelector(".header__items-mobile");

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
  nav.classList.add("header__items_open");
}

function fecharMenu(nav) {
  nav.classList.add("header__items_not-displayed");
  nav.classList.remove("header__items_open");
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


document.querySelector(".header__open-icon")
.addEventListener("click", controlarMenu);
document.querySelector(".header__close-icon").addEventListener("click", controlarMenu);