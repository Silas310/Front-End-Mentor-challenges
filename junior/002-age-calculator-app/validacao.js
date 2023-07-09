let form = document.querySelectorAll("form"),
    labels = document.querySelectorAll("label"),
    dia = document.getElementById("input-day"),
    mes = document.getElementById("input-month"),
    ano = document.getElementById("input-year");
const data = new Date();


for(let i = 0; i < 3; i++){
    form[0][i].addEventListener("input", verificar);
}

form[0][1].addEventListener("input", reavaliarDia);
form[0][2].addEventListener("input", reavaliarDia);

form[0].addEventListener("submit", event =>{
    event.preventDefault();
})

/*form[0][3].addEventListener("click", enviar);*/


function verificar(event, id = event.target.id){
    let valorInserido = event.target.value,
        mes = document.getElementById("input-month").value,
        ano = document.getElementById("input-year").value;
    switch(id){
        case "input-day":
            if(verificarDia(valorInserido, mes, ano) === false){
                mudarEstado(false, 0);
            }else{
                mudarEstado(true, 0);
            }
            break;
        case "input-month":
            if(verificarMes(valorInserido) === false){
                mudarEstado(false, 1);
            }else{
                mudarEstado(true, 1);
            }
            break;
        case "input-year":
            if(verificarAno(valorInserido) === false){
                mudarEstado(false, 2);
            }else{
                mudarEstado(true, 2);
            }
            break;
    }
}


function verificarDia(dia, mes = null, ano = null){
    mes = parseInt(mes);
    if(dia < 1 || dia > 31){
        return false;
    }
    if(mes === 4 ||
       mes === 6 ||
       mes === 9 ||
       mes === 11){
        return dia <= 30;
       }
    if(mes === 2){
        if(ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0) ){
            return dia <= 29;
        }else{
            return dia <= 28;
        }
    }
    return true;
}


function verificarMes(mes){
    return mes >= 1 && mes <= 12;
}


function verificarAno(ano){
    return ano >= 0 && ano <= data.getFullYear();
}

function reavaliarDia(){
    let dia = document.getElementById("input-day").value,
        mes = document.getElementById("input-month").value,
        ano = document.getElementById("input-year").value;
    if(verificarDia(dia, mes, ano) === false){
        mudarEstado(false, 0);
    }else{
        mudarEstado(true, 0);
    }
}

function mudarEstado(validade, index){
    if(validade === true){
        labels[index].classList.remove("error-color");
        form[0][index].classList.remove("error-border");
        form[0].children[index].children[2].
        classList.add("displayNone");
    }else{
        labels[index].classList.add("error-color");
        form[0][index].classList.add("error-border");
        form[0].children[index].children[2].
        classList.remove("displayNone");
    }
}
