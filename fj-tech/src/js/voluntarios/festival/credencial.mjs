// Initializa a integração com o Firebase
import { db } from "./../../firebaseConfig.mjs";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";

import './../lista.mjs';

// Obtém o ano da edição atual do festival
const edicaoAtualFestival = "2024";
// Obtém os elementos referentes ao código de credencial do voluntário
const txtCredencial = document.getElementById("codigoCredencial");
const btnCredencial = document.getElementById("cadastraCodigoCredencial");

/**
 * Exibe as informações refentes à edição atual do festival relacionadas ao voluntário
 * no offcanvas de gestão de recursos do voluntário no festival
 */
document.getElementById("corpoTabelaDeListagemDeVoluntarios").addEventListener("click", async (event) => {
    const idVoluntarioPerfil = event.target.closest("tr").id;
    
    const docVoluntarioRef = doc(db, "voluntario", idVoluntarioPerfil);
    const docFestivalRef = doc(docVoluntarioRef, 'festival', edicaoAtualFestival);
    const festival = await getDoc(docFestivalRef);

    const credencialVoluntario = festival.data().codigo_credencial_voluntario;

    if (credencialVoluntario !== null) {
        bloquearCampoCredencial(credencialVoluntario);
        return;
    }

    desbloquearCampoCredencial();
});

/**
 * Torna a edição do campo de credencial inválida, vloqueia o botão de cadastro e exibe o código de credencial do voluntário
 * @param {String} credencial - Código de credencial do voluntário
 */
function bloquearCampoCredencial(credencial) {
    // Remove a validação do campo
    if (txtCredencial.classList.contains("is-invalid")) {
        txtCredencial.classList.remove("is-invalid");
    }

    // Exibe o código de credencial do voluntário e bloqueia a edição do campo
    txtCredencial.value = credencial;
    txtCredencial.readOnly = true;

    // Desabilita o botão de cadastro de código de credencial
    btnCredencial.disabled = true;
}

/**
 * Torna a edição do campo de credencial disponível para o cadastro de uma novo credencial para o voluntário
 */
function desbloquearCampoCredencial() {
    // Limpa o valor de credencial e permite a edição do campo
    txtCredencial.value = "";
    txtCredencial.readOnly = false;

    // Habilita o botão de cadastro de código de credencial
    btnCredencial.disabled = false;

    // Foca no campo de credencial
    txtCredencial.focus();
}

/**
 * Valida o código de credencial do voluntário que está sendo digitado
 */
txtCredencial.addEventListener("input", () => {
    /**
     * Não permite a submissão de um código de credencial vazio nem com espaços em branco
     */
    if (txtCredencial.value.trim() === null || txtCredencial.value.trim() === "" 
        || txtCredencial.value.includes(" ") || txtCredencial.value.trim() === "0") {
            txtCredencial.classList.add("is-invalid");

            return;
    } 

    /**
     * Não permite a submissão de um código de credencial com apenas zeros
     */
    if (txtCredencial.value.trim() === "0".repeat(txtCredencial.value.length)) { 
        txtCredencial.classList.add("is-invalid");

        return;
    }

    /**
     * Não permite a submissão de um código de credencial com çetras
     */
    if (txtCredencial.value.trim().match(/[a-zA-Z]/)) {
        txtCredencial.classList.add("is-invalid");

        return;
    }

    // Remove a validação do campo
    txtCredencial.classList.remove("is-invalid");
});

/**
 * Associa a credencial informada ao voluntário após a verificação da validade do código
 */
btnCredencial.addEventListener("click", async () => {
    if (txtCredencial.classList.contains("is-invalid")) {
        txtCredencial.focus();

        return;
    }

    const idVoluntarioGerenciado = document.getElementById("gestaoRecusosVoluntarioNoFestival").textContent; 
    const docVoluntarioRef = doc(db, "voluntario", idVoluntarioGerenciado);
    const docFestivalRef = doc(docVoluntarioRef, 'festival', edicaoAtualFestival);    

    // Set the value for codigo_credencial_voluntario field in docFestivalRef
    await updateDoc(docFestivalRef, {
        codigo_credencial_voluntario: txtCredencial.value
    }).then(() => {        
        console.log("Código de credencial cadastrado com sucesso!");           
    }).catch((erro) => {
        console.error("Erro ao cadastrar o código de credencial: ", erro);
    });
});