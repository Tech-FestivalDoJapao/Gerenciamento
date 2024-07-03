import { db } from './database.mjs';
import { doc, deleteDoc } from 'firebase/firestore';

// Função para obter o nome do documento
async function getDocumentNameById(collection, IdVoluntario) {
    try {
        const docRef = doc(db, collection, IdVoluntario);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().nome_completo_voluntario; 
        } else {
            console.log("Documento não encontrado!");
            return null;
        }
    } catch (error) {
        console.error("Erro ao obter o documento:", error);
        return null;
    }
}

// Função para excluir o documento
async function deleteDocumentById(collection, IdVoluntario) {
    try {
        const docRef = doc(db, collection, IdVoluntario);
        await deleteDoc(docRef);
        console.log(`Documento com ID ${IdVoluntario} foi excluído.`);
    } catch (error) {
        console.error("Erro ao excluir documento:", error);
    }
}

// Evento de clique para o botão de confirmação
/*
document.addEventListener('DOMContentLoaded', () => {
    const btnRemoverVoluntario = document.getElementById('removerVoluntario');
    const confirmarExclusao = document.getElementById('btnExcluirVoluntario');
    let IdVoluntario;

    btnRemoverVoluntario.addEventListener('click', async () => {
        IdVoluntario = btnRemoverVoluntario.getAttribute('name');
        console.log(IdVoluntario);

        const voluntarioName = await getDocumentNameById('voluntario', IdVoluntario);
        if (voluntarioName) {
            const mensagemConfirmaExclusao = document.getElementById("nomeVoluntarioCandidatoRemocao").innerHTML += `voluntarioName-`;

            const modalElement = new bootstrap.Modal(document.getElementById('staticBackdrop'));
            modalElement.show();

            console.log(IdVoluntario);
        }
    });

    confirmarExclusao.addEventListener('click', async () => {
        if (IdVoluntario) {
            await deleteDocumentById('voluntario', IdVoluntario);
            // Feche o modal após a exclusão
            const modalElement = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
            modalElement.hide();
        }
    });
});

*/
