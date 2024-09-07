// Initializa a integração com o Firebase
import { db } from "./../../firebaseConfig.mjs";
import { doc, collection, getDoc, getDocs, query, updateDoc } from "firebase/firestore";

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
        desbloquearCamposGerenciais();

        return;
    }

    desbloquearCampoCredencial();
    bloquearCamposGerenciais();
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
 * Bloqueia a edição dos campos de gestão de recursos do voluntário no festival
 */
function bloquearCamposGerenciais() {
    // Campos reláriosnados à horários de trabalho do voluntário
    document.getElementById("cadastraCheckIn").setAttribute("disabled", true);
    document.getElementById("cadastraCheckOut").setAttribute("disabled", true);
    document.getElementById("cadastraInicioIntervalo").setAttribute("disabled", true);
    document.getElementById("cadastraTerminoIntervalo").setAttribute("disabled", true);

    // Campos relacionados à recursos utilizados pelo voluntário
    // Hapi
    document.getElementById("tamanhoHapi").setAttribute("disabled", true);
    document.getElementById("cadastraTamanhoHapi").setAttribute("disabled", true);
    // Voucher
    document.getElementById("tipoVoucher").setAttribute("disabled", true);
    document.getElementById("cadastraResgateVoucher").setAttribute("disabled", true);
}

/**
 * Desbloqueia a edição dos campos de gestão de recursos do voluntário no festival
 */
function desbloquearCamposGerenciais() {
    // Campos reláriosnados à horários de trabalho do voluntário
    document.getElementById("cadastraCheckIn").removeAttribute("disabled");
    document.getElementById("cadastraCheckOut").removeAttribute("disabled");
    document.getElementById("cadastraInicioIntervalo").removeAttribute("disabled");
    document.getElementById("cadastraTerminoIntervalo").removeAttribute("disabled");

    // Campos relacionados à recursos utilizados pelo voluntário
    // Hapi
    document.getElementById("tamanhoHapi").removeAttribute("disabled");
    document.getElementById("cadastraTamanhoHapi").removeAttribute("disabled");
    // Voucher
    document.getElementById("tipoVoucher").removeAttribute("disabled");
    document.getElementById("cadastraResgateVoucher").removeAttribute("disabled");
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

    /**
     * TODO: Verifica se o código de credencial informado já foi cadastrado para outro voluntário
     */

    const idVoluntarioGerenciado = document.getElementById("gestaoRecusosVoluntarioNoFestival").textContent;
    const docVoluntarioRef = doc(db, "voluntario", idVoluntarioGerenciado);
    const docFestivalRef = doc(docVoluntarioRef, 'festival', edicaoAtualFestival);

    // Completa com zeros antes do código de crdencial caso o número de caracteres seja menor que 4
    if (txtCredencial.value.length < 4) {
        txtCredencial.value = "0".repeat(4 - txtCredencial.value.length) + txtCredencial.value;
    }

    // Set the value for codigo_credencial_voluntario field in docFestivalRef
    await updateDoc(docFestivalRef, {
        codigo_credencial_voluntario: txtCredencial.value
    }).then(() => {
        console.log("Código de credencial cadastrado com sucesso!");

        // Atualiza o valor da credencial na tabela apenas para o voluntário gerenciado
        document.getElementById(idVoluntarioGerenciado).querySelector("#credencial").textContent = txtCredencial.value;

        bloquearCampoCredencial(txtCredencial.value);
        desbloquearCamposGerenciais();
    }).catch((erro) => {
        console.error("Erro ao cadastrar o código de credencial: ", erro);
    });
});