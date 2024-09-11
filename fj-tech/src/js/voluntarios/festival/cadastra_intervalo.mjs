// Initializa a integração com o Firebase
import { db } from "../../firebaseConfig.mjs";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import '../lista.mjs';

// Obtém o ano da edição atual do festival
import { edicaoAtualFestival } from "../lista.mjs";

// Lista de voluntários
const listaDeVoluntarios = document.getElementById("corpoTabelaDeListagemDeVoluntarios");

// Obtém os elementos refentes ao início e término do intervalo do voluntário
const btnInicioIntervalo = document.getElementById("cadastraInicioIntervalo");
const btnTerminoIntervalo = document.getElementById("cadastraTerminoIntervalo");
// Obtém a div para exibição dos horários de intervalo
const txtInicioIntervalo = document.getElementById("horarioInicioIntervalo");

/**
 *TODO: Associa um horário de início de intervalo ao voluntário
 */
listaDeVoluntarios.addEventListener("click", async (event) => {});

/**
 * TODO: Associa um horário de término de intervalo ao voluntário
 */
listaDeVoluntarios.addEventListener("click", async (event) => {
    // Acessa as informações do voluntário
    const idVoluntario = event.target.closest("tr").id;
    const docVoluntarioRef = doc(db, "voluntario", idVoluntario);
    const docFestivalRef = doc(docVoluntarioRef, 'festival', edicaoAtualFestival);
    const festival = await getDoc(docFestivalRef);

    // Obtém o horário já existente no banco
    
    
});

/**
 * TODO: Exibe os horários de início e término de intervalo
 */
btnInicioIntervalo.addEventListener("click", async () => {
    console.log("Início de intervalo");
});
btnTerminoIntervalo.addEventListener("click", async () => {
    console.log("Término de intervalo");
});