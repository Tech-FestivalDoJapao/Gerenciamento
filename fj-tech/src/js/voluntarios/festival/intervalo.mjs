// Initializa a integração com o Firebase
import { db } from "./../../firebaseConfig.mjs";
import { doc, getDoc } from "firebase/firestore";

import './../lista.mjs';

/**
 * TODO: Valida as informações de início e término do intervalo baseado no turno do voluntário
 */

/**
 * Obtém o id do voluntário gerenciado
 */
const idVoluntarioGerenciado = document.getElementById("gestaoRecusosVoluntarioNoFestival");
// Define a configuração do observarDocVoluntario o id atuaç
const config = { childList: true, characterData: true, subtree: true };
// Função de callback que será chamada quando ocorrer uma mutação
const callback = (mutationsList, observarDocVoluntario) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
            // Verifica e valida o novo texto do elemento
            const newText = idVoluntarioGerenciado.innerText || idVoluntarioGerenciado.textContent;
            //console.log('Texto válido:', newText);
        }
    }
};
// Cria um MutationObserver e o conecta ao nó alvo
const observarDocVoluntario = new MutationObserver(callback);
observarDocVoluntario.observe(idVoluntarioGerenciado, config);

/**
 * Identifica se já existe um intervalo cadastrado para o voluntário
 */
const btnGerenciaVoluntario = document.getElementById("GerenciarRecursosDoVoluntarioNoFestival");
btnGerenciaVoluntario.addEventListener("click", () => {
    const voluntarioDoc = getDoc(doc(db, "voluntario", idVoluntarioGerenciado.textContent));
    console.log(voluntarioDoc);
});