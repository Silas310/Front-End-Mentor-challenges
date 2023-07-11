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

form[0][3].addEventListener("click", mostrarResultado);


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
    return ano >= 1 && ano <= data.getFullYear();
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


function mostrarResultado(){
    let diaNascimento, mesNascimento, anoNascimento;
        diaNascimento = document.getElementById("input-day").value,
        mesNascimento = document.getElementById("input-month").value,
        anoNascimento = document.getElementById("input-year").value;
    const idade = calcularIdade(diaNascimento, 
        mesNascimento, anoNascimento);
    let resultados = document.querySelectorAll(".result");
    console.log(idade)
    for(let i = 0; i < 3; i++){
        resultados[i].style.opacity = 0;
        setTimeout( () => {
            resultados[i].innerText = idade[i];
            resultados[i].style.opacity = 1;
        }, 1000 )
        /*resultados[i].innerText = idade[i];*/
    }
    /*resultados[0].innerText = idade.anos;
    resultados[1].innerText = idade.meses;
    resultados[2].innerText = idade.dias;*/

}

function calcularIdade(diaN, mesN, anoN){
    const anoAtual = data.getFullYear(),
        mesAtual = data.getMonth() + 1,
        diaAtual = data.getDate();
    let idadeAnos = anoAtual - anoN,
        idadeMeses = mesAtual - mesN,
        idadeDias = diaAtual - diaN;
    if(idadeDias < 0){
        idadeMeses--;
        idadeDias += diasNoMes(mesAtual - 1, anoAtual);
    }
    if(idadeMeses < 0){
        idadeAnos--;
        idadeMeses += 12;

    }
    console.log(diasNoMes(2, 2022));
    return [idadeAnos, idadeMeses, idadeDias]
    

    function diasNoMes(mes, ano){
        return new Date(ano, mes, 0).getDate();
    } 
}