// Initializa a integração com o Firebase
import { db } from "./../firebaseConfig.mjs";
import { doc, deleteDoc } from "firebase/firestore";

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