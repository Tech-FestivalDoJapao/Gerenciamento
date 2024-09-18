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
    const statusVoluntarioRemocao = document.getElementById("statusVoluntario").textContent;

    // Remove o voluntário do banco de dados Firebase
    try {
        await deleteDoc(doc(db, "voluntario", idVoluntarioRemocao)).then(() => {
            console.log("Voluntário removido com sucesso!");

            diminuiContagemDeVoluntarios(statusVoluntarioRemocao);
        });

        /**
         * Atualiza a quantidade total de voluntários presentes na tela de recursos do festival após a remoção de um voluntário
         */
        const voluntariosFestival = await getDocs(query(collection(db, "voluntario")));    
        document.getElementById("totalVoluntariosFestival").innerHTML = voluntariosFestival.size;

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
 * Atualiza a quantideadse de voluntários do festival e decresce a contagem de voluntários no status em que o 
 * volkuntário removido se encontrava
 * 
 * @param {String} status 
 */
async function diminuiContagemDeVoluntarios(status) {   
    const qtdeVoluntariosPresentes = document.getElementById("qtdeVoluntariosPresentes");
    if (status === " Ativo ") {       
        qtdeVoluntariosPresentes.textContent = parseInt(qtdeVoluntariosPresentes.textContent) - 1;
    }

    const qtdeVoluntariosIntervalo = document.getElementById("qtdeVoluntariosIntervalo");
    if (status === " Intervalo ") {        
        qtdeVoluntariosIntervalo.textContent = parseInt(qtdeVoluntariosIntervalo.textContent) - 1;
    }

    const qtdeVoluntariosAusentes = document.getElementById("qtdeVoluntariosAusentes");
    if (status === " Inativo ") {        
        qtdeVoluntariosAusentes.textContent = parseInt(qtdeVoluntariosAusentes.textContent) - 1;
    }
}