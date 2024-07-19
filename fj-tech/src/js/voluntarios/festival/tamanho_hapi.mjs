// Initializa a integração com o Firebase
import { db } from "./../../firebaseConfig.mjs";
import { doc, getDoc } from "firebase/firestore";

import './../lista.mjs';

/**
 * TODO: Valida a quantidade de hapis disponíveis por tamanho 
 */
document.getElementById("tamanhoHapi").addEventListener("change", async () => {
    const tamanhoHapi = document.getElementById("tamanhoHapi");

    // [TESTE] Se o tamanho do hapi for diferente de M, G ou GG exibe uma mensagem de erro
    if (tamanhoHapi.value === "M" || tamanhoHapi.value === "G" || tamanhoHapi.value === "GG") {
        tamanhoHapi.classList.remove("is-invalid");
        tamanhoHapi.classList.add("is-valid");
    } else {
        tamanhoHapi.classList.remove("is-valid");
        tamanhoHapi.classList.add("is-invalid");
    }
});

/**
 * TODO: Associa o tamanho do hapi selecionado ao voluntário
 */

document.getElementById("cadastraTamanhoHapi").addEventListener("click", async (event) => {
    event.preventDefault();

    const idVoluntario = document.getElementById("gestaoRecusosVoluntarioNoFestival").value;
    const tamanhoHapiDoVoluntario = document.getElementById("tamanhoHapi").value;

    try {
        // Identifica o voluntário que irá resgatar o hapi no banco de dados
    } catch (erro) {
        console.error("Erro ao cadastrar o resgate do hapi pelo voluntário.\n", erro);
    }
});