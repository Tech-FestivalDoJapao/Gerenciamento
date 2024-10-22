// Initializa a integração com o Firebase
import { db } from "../../firebaseConfig.mjs";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import '../lista.mjs';

// Obtém o ano da edição atual do festival
import { edicaoAtualFestival } from "../lista.mjs";

// Obtém os elementos referentes ao resgate de hapi do voluntário
const btnResgateHapi = document.getElementById("cadastraTamanhoHapi");
const optTamanhoHapi = document.getElementById("tamanhoHapi");
const txtResgateHapi = document.getElementById("informacoesResgateHapi");

/**
 * Exibe as informações refentes à edição atual do festival relacionadas ao voluntário
 * no offcanvas de gestão de recursos do voluntário no festival
 */
document.getElementById("corpoTabelaDeListagemDeVoluntarios").addEventListener("click", async (event) => {
    // Limpa o campo de informações de resgate de hapi
    txtResgateHapi.textContent = "";
    // Habilita o campo de seleção de tamanho do hapi
    desbloquearCampoHapi();
    optTamanhoHapi.classList.remove("is-invalid");

    // Acessa as informações do voluntário
    const idVoluntario = event.target.closest("tr").id;
    const docVoluntarioRef = doc(db, "voluntario", idVoluntario);
    const docFestivalRef = doc(docVoluntarioRef, 'festival', edicaoAtualFestival);
    const festival = await getDoc(docFestivalRef);

    // Obtém o tamanho do hapi informado pelo voluntário durante o cadastro
    const tamanhoHapi = festival.data().tamanho_hapi_voluntario;
    const horaResgateHapi = (festival.data().hora_resgate_hapi)
        ? festival.data().hora_resgate_hapi
        : null;

    // Exibe a informação de resgate do hapi do voluntário
    if (horaResgateHapi !== null) {
        txtResgateHapi.innerHTML = `<small class="opacity-50 m-0 px-4">Resgatado às ${horaResgateHapi.toDate().toLocaleTimeString("pt-BR", { hour12: false })}</small>`;
        bloquearCampoHapi();
    }

    /**
     * Caso o voluntário tenha informado o tamanho do hapi preferível, o tamanho escolhido é automaticamente exibido 
     * como opção selecionada no campo de seleção de tamanho do hapi
     */
    if (tamanhoHapi !== null) {
        optTamanhoHapi.value = tamanhoHapi;

        return;
    }
    // Caso o voluntário não tenha informado o tamanho do hapi, o campo de seleção de tamanho do hapi é resetado
    optTamanhoHapi.value = optTamanhoHapi.options[0].value;

    /**
     * Associa o tamanho do hapi selecionado ao voluntário
     */
    btnResgateHapi.addEventListener("click", async (event) => {
        const tamanhoHapiDoVoluntario = optTamanhoHapi.value;

        if (tamanhoHapiDoVoluntario !== optTamanhoHapi.options[0].value || tamanhoHapiDoVoluntario !== "Tamanho do hapi resgatado") {
            await updateDoc(docFestivalRef, {
                hora_resgate_hapi: new Date(),
                tamanho_hapi_voluntario: tamanhoHapiDoVoluntario
            }).then(() => {
                console.log("Hapi associado com sucesso.");
                
                txtResgateHapi.innerHTML = `<small class="opacity-50 m-0 px-4">Resgatado às ${new Date().toLocaleTimeString()}</small>`;
                bloquearCampoHapi();
            }).catch(erro => {
                console.error("Erro ao associar o tamanho do hapi ao voluntário.\n", erro);
                desbloquearCampoHapi();
            });
        } else {
            optTamanhoHapi.classList.add("is-invalid");
            optTamanhoHapi.focus();
        }
    });
});

/**
 * Desabilita o botão de resgate de hapi, o campo de selção e exibe o tamanho do hapi do voluntário
 * @param {String} tamanhoHapi 
 */
function bloquearCampoHapi() {
    // Exibe o tamanho do hapi do voluntário e bloqueia a edição do campo
    optTamanhoHapi.value = optTamanhoHapi.value;
    optTamanhoHapi.disabled = true;

    // Desabilita o botão de cadastro de tamanho do hapi
    btnResgateHapi.disabled = true;
    btnResgateHapi.style.cursor = "not-allowed";
}

/**
 * Habilita o campo de seleção de tamanho do hapi e o botão de cadastro de tamanho do hapi
 */
function desbloquearCampoHapi() {
    // Habilita o campo de seleção de tamanho do hapi
    optTamanhoHapi.disabled = false;

    // Habilita o botão de cadastro de tamanho do hapi
    btnResgateHapi.disabled = false;
    btnResgateHapi.style.cursor = "pointer";
}