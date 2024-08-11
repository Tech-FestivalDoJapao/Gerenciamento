// Initializa a integração com o Firebase
import { db } from "./../firebaseConfig.mjs";
import { collection, doc, deleteDoc, getDocs, query } from "firebase/firestore";

import './lista.mjs';
/**
 * Remove um voluntário da listagem de voluntários e do banco de dados Firebase
 * através do modal de confirmação de remoção
 */
document.getElementById("btnRemoverVoluntario").addEventListener("click", async () => {
    const idVoluntarioRemocao = document.getElementById("identificaRegistroVoluntario").textContent;
    console.log(idVoluntarioRemocao);

    // Remove o voluntário do banco de dados Firebase
    try {
        await deleteDoc(doc(db, "voluntario", idVoluntarioRemocao));
        console.log("Voluntário removido com sucesso!");

        /**
         * Atualiza a listagem de voluntários após a remoção de um voluntário
         */
        const voluntarioRemovido = document.getElementById(idVoluntarioRemocao);
        if (voluntarioRemovido) {
            voluntarioRemovido.remove();
        }
    } catch (erro) {
        console.error("Erro ao remover voluntário: ", erro);
    }
});

/**
 * Atualiza o card de voluntários presentes na tela de recursos no festival após a remoção de um voluntário
 */
document.getElementById("btnRemoverVoluntario").addEventListener("click", async () => {
    const voluntariosDoc = await getDocs(query(collection(db, "voluntario")));
    const voluntariosFestival =  voluntariosDoc.size; 

    // Atualiza a quantidade total de voluntários presentes no festival
    document.getElementById("totalVoluntariosFestival").innerHTML = voluntariosFestival;

    /**
     * TODO: Atualizar informações de voluntários presentes, em intervalo e ausentes na tela de recursos
     * após a remoção de um voluntário
     * 
     * > Atualiza a quantidade de voluntários presentes no festival identificados com o status "Ativo"
     * > Atualiza a quantidade de voluntários em intervalo no festival identificados com o status "Intervalo"
     * > Atualiza a quantidade de voluntários ausentes no festival identificados com o status "Inativo"
     * > Atualiza a porcentagem de voluntários presentes no festival para exibir no progress bar 
     */
});