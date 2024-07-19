// Initializa a integração com o Firebase
import { db } from "./../../firebaseConfig.mjs";
import { doc, getDoc } from "firebase/firestore";

import './../lista.mjs';

/**
 * TODO: Exibe as informações refentes à edição atual do festival relacionadas ao voluntário
 * no offcanvas de gestão de recursos do voluntário no festival
 */

/**
 * Valida o código de credencial do voluntário
 */
document.getElementById("cadastraCodigoCredencial").addEventListener("click", async () => {
    const codigoCredencial = document.getElementById("codigoCredencial");

    // Não permite a submissão de um código de credencial vazio nem com espaços em branco
    if (codigoCredencial.value.trim() === null || codigoCredencial.value.trim() === "" || codigoCredencial.value.includes(" ")) {
        document.getElementById("codigoCredencial").focus();

        // Exibe uma validação
        document.getElementById("codigoCredencial").classList.add("is-invalid");
        document.getElementById("codigoCredencial").classList.remove("is-valid");

        return;
    }

    // Verifica se o código de credencial é válido
    if (codigoCredencial.value.length >= 4) {
         // Remove a validação do campo
        (document.getElementById("codigoCredencial").classList.contains("is-invalid")) 
            ? (document.getElementById("codigoCredencial").classList.remove("is-invalid") 
                && document.getElementById("codigoCredencial").classList.add("is-valid"))
            : document.getElementById("codigoCredencial").classList.add("is-valid");

        return;
    } else {
        // Exibe uma validação
        document.getElementById("codigoCredencial").classList.add("is-invalid");
        document.getElementById("codigoCredencial").classList.remove("is-valid");

        return;
    }
});

/**
 * TODO: Associa uma credencial válida ao usuário
 */
document.getElementById("cadastraCodigoCredencial").addEventListener("click", async () => {
    const credencial = document.getElementById("codigoCredencial").value;
    const nomeVoluntario = document.getElementById("nomeVoluntarioGerenciado").value;

    // Verifica se o código de credencial é válido
});

