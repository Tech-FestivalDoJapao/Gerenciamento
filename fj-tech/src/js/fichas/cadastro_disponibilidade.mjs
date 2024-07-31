// Initializa a integração com o Firebase
import { db } from "./../firebaseConfig.mjs";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

/**
 * TODO: Reúne as informações da ficha de disponibilidade de voluntários
 */
function informacoesFichaDeDisponibilidade() {
    // Confirmação do Voluntário
    const nomeVoluntarioFicha = document.getElementById("nomeVoluntarioFichaDeDisponibilidade").value;
    const emailVoluntarioFicha = document.getElementById("emailVoluntarioFichaDeDisponibilidade").value;
    const contatoVoluntarioFicha = document.getElementById("celularVoluntarioFichaDeDisponibilidade").value;

    const disponivelParaVoluntariar = document.getElementById("podeVoluntariarFichaDeDisponibilidade").value;

    console.log('Nome do voluntário: ', nomeVoluntarioFicha);

    // Sexta-feira
    const indisponivelSexta = document.getElementById(indisponivelSexta);

    // Sábado
    // Domingo
    // Preferências

    return {
        nomeVoluntarioFicha, emailVoluntarioFicha, contatoVoluntarioFicha,
        disponivelParaVoluntariar
    };    
}

document.getElementById('enviaFichaDeDisponibilidade').addEventListener('click', async () => {
    informacoesFichaDeDisponibilidade();

    try {
        await db.collection('voluntario').doc(voluntario).set({
            // Atualiza os horários do voluntário
        }, { merge: true });
    } catch (erro) {
        console.error('Erro ao anexar a ficha de disponibilidade ao cvadastro do voluntário: ', erro);
    }
});

/**
 * TODO: Cadastra a disponibilidade de voluntários
 */