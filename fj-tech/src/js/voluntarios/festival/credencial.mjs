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
    let cod = document.getElementById("codigoCredencial").value;
    console.log(cod);

    const codigoCredencial = document.getElementById("codigoCredencial");

    // Não permite a submissão de um código de credencial vazio nem com espaços em branco
    if (codigoCredencial.value.trim() === null || codigoCredencial.value.trim() === "" || codigoCredencial.value.includes(" ")) {
        document.getElementById("codigoCredencial").focus();

        // Exibe uma validação
        document.getElementById("codigoCredencial").classList.add("is-invalid");
        document.getElementById("codigoCredencial").classList.remove("is-valid");

        return;
    }

    // Verifica se o código de credencial é válido (possui mais de 4 caracteres)
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

    /**
     * Associa a credencial informada ao voluntário após a verificação da validade do código
     */
    const nomeVoluntario = document.getElementById("nomeVoluntarioGerenciado").value;
    const docVoluntario = document.getElementById("gestaoRecusosVoluntarioNoFestival").textContent;

    // Busca o documento do voluntário no banco de dados
    const docVoluntarioRef = doc(db, "voluntarios", docVoluntario);
    const docVoluntarioSnap = await getDoc(docVoluntarioRef);

    // Verifica se o documento do voluntário existe
    if (docVoluntarioSnap.exists()) {
        // Atualiza o documento do voluntário com o código de credencial
        /*await db.collection("voluntarios").doc(docVoluntario).update({
            codigoCredencial: codigoCredencial.value
        });*/

        console.log("Código de credencial cadastrado com sucesso!");
    } else {
        // Exibe uma mensagem de erro
        document.getElementById("mensagemErro").classList.remove("d-none");
        document.getElementById("mensagemSucesso").classList.add("d-none");
    }
});