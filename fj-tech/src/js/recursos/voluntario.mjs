// Initializa a integração com o Firebase
import { db } from "./../firebaseConfig.mjs";
import { collection, getDocs, query } from "firebase/firestore";

import './../voluntarios/lista.mjs';

/**
 * Filtra a data atual para exibir apenas o dia do evento
 */
let dataAtual = new Date();
document.getElementById("diaAtualEvento").innerHTML = dataAtual.getDate().toString().padStart(2, "0") + "/" 
                                                    + (dataAtual.getMonth() + 1).toString().padStart(2, "0");

/**
 * Identifica a quantidade de voluntários cadastrados para a edição atual do festival
 */
const queryRecursos = query(collection(db, "voluntario"));
const querySnapshot = await getDocs(queryRecursos);

const voluntariosFestival = querySnapshot.size;
document.getElementById("totalVoluntariosFestival").innerHTML = voluntariosFestival;

// Inicia contagem de voluntários por status
let voluntariosAtivos = 0;
let voluntariosIntervalo = 0;
let voluntariosAusentes = 0;

/**
 * Identifica a quantiade de voluntários em cada status (ativo, intervalo, inativo) que estão sendo listados
 */
const listaDeVoluntarios = document.querySelectorAll("#corpoTabelaDeListagemDeVoluntarios tr");
listaDeVoluntarios.forEach((voluntario) => {
    const verificaStatusVoluntario = voluntario.querySelector("#statusVoluntario").textContent;
    /**
     * Identifica sw o voluntário está identificado com o status "Ativo"
     */
    if (verificaStatusVoluntario === " Ativo ") {
        voluntariosAtivos++;
    }

    /**
     * Identifica se o voluntário está identificado com o status "Intervalo"
     */
    if (verificaStatusVoluntario === " Intervalo ") {
        voluntariosIntervalo++;
    }

    /**
     * Identifica se o voluntário está identificado com o status "Inativo"
     */
    if (verificaStatusVoluntario === " Inativo ") {
        voluntariosAusentes++;
    }
});

/**
 * Exibe a quantidade e a porcentagem de voluntários presentes (ativos) no festival
 */
document.getElementById("qtdeVoluntariosPresentes").innerHTML = voluntariosAtivos;
// Calcula a porcentagem de voluntários presentes no festival para exibir no progress bar
const porcentagemVoluntariosPresentes = ((voluntariosAtivos / voluntariosFestival) * 100);
// Atualiza o progress bar de voluntários presentes
document.getElementById("volPresente").style.width = porcentagemVoluntariosPresentes + "%";
document.getElementById("volPresente").ariaValueNow = voluntariosAtivos;
document.getElementById("volPresente").children[0].innerHTML = porcentagemVoluntariosPresentes.toFixed(2) + "%";

/**
 * Exibe a quantidade e a porcentagem de voluntários em intervalo no festival
 */
document.getElementById("qtdeVoluntariosIntervalo").innerHTML = voluntariosIntervalo;
// Calcula a porcentagem de voluntários em intervalo no festival para exibir no progress bar
const porcentagemVoluntariosIntervalo = ((voluntariosIntervalo / voluntariosFestival) * 100);
// Atualiza o progress bar de voluntários em intervalo
document.getElementById("volIntervalo").style.width = porcentagemVoluntariosIntervalo + "%";
document.getElementById("volIntervalo").ariaValueNow = voluntariosIntervalo;
document.getElementById("volIntervalo").children[0].innerHTML = porcentagemVoluntariosIntervalo.toFixed(2) + "%";

/**
 * Exibe a quantidade e a porcentagem de voluntários ausentes (inativos) no festival
 */
document.getElementById("qtdeVoluntariosAusentes").innerHTML = voluntariosAusentes;
// Calcula a porcentagem de voluntários ausentes no festival para exibir no progress bar
const porcentagemVoluntariosAusentes = ((voluntariosAusentes / voluntariosFestival) * 100);
// Atualiza o progress bar de voluntários ausentes
document.getElementById("volAusente").style.width = porcentagemVoluntariosAusentes + "%";
document.getElementById("volAusente").ariaValueNow = voluntariosAusentes;
document.getElementById("volAusente").children[0].innerHTML = porcentagemVoluntariosAusentes.toFixed(2) + "%";