// Initializa a integração com o Firebase
import { db } from "../../firebaseConfig.mjs";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import '../lista.mjs';

// Obtém o ano da edição atual do festival
import { edicaoAtualFestival } from "../lista.mjs";

/**
 * TODO: Valida o resgate de voucher baseado no turno do voluntário
 */

/**
 * Cadastra o resgate de voucher do voluntário em um novo intervalo de trabalho
 */
document.getElementById("corpoTabelaDeListagemDeVoluntarios").addEventListener("click", async (event) => {
    const idVoluntario = event.target.closest("tr").id;

    const docVoluntarioRef = doc(db, "voluntario", idVoluntario);
    const docFestivalRef = doc(docVoluntarioRef, 'festival', edicaoAtualFestival);
    const festival = await getDoc(docFestivalRef);

    const horariosSexta = festival.data().expediente.horarios_sexta.intervalo;
    console.log(horariosSexta);

    const ultimoIntervalo = Object.keys(horariosSexta).pop();
    const ultimoCaracter = ultimoIntervalo.charAt(ultimoIntervalo.length - 1);
    const novoCaracter = String.fromCharCode(ultimoCaracter.charCodeAt(0) + 1);
    const novoIntervalo = `intervalo_${novoCaracter}`;

    await updateDoc(docFestivalRef, {
        "expediente.horarios_sexta.intervalo": {
            ...horariosSexta,
            [novoIntervalo]: {
                "inicio_intervalo": new Date(),
                "termino_intervalo": null,
                "resgate_voucher": true,
                "devolucao_hapi": false
            }
        }
    });
    console.log("Intervalo atualizado para corresponder ao resgate de voucher do voluntário");
});