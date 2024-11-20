// Initializa a integração com o Firebase
import { db } from "../../firebaseConfig.mjs";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import '../lista.mjs';

// Obtém o ano da edição atual do festival
import { edicaoAtualFestival } from "../lista.mjs";

// Obtém as funções de bloqueio e desbloqueio dos campos referntes ao turno do voluntário
import { desbloquearCheckOut, desbloquearInicioIntervalo, bloquearTerminoIntervalo } from "./turno.mjs";
import { bloquearResgateHapi, desbloquearResgateHapi } from "./resgate_hapi.mjs";
import { bloquearResgateVoucher } from "./resgate_voucher.mjs";

// Obtém os elementos referentes ao check-in do voluntário
const btnCheckIn = document.getElementById("cadastraCheckIn");
const txtCheckIn = document.getElementById("horarioCheckIn");
// Obtém o elemento referente ao código de credencial do voluntário
const txtCredencial = document.getElementById("codigoCredencial");

/**
 * Associa um horário de check-in ao voluntário e o torna ativo no festival
 */
document.getElementById("corpoTabelaDeListagemDeVoluntarios").addEventListener("click", async (event) => {
    // Acessa as informações do voluntário
    const idVoluntario = event.target.closest("tr").id;
    const docVoluntarioRef = doc(db, "voluntario", idVoluntario);
    const docFestivalRef = doc(docVoluntarioRef, 'festival', edicaoAtualFestival);
    const festival = await getDoc(docFestivalRef);

    // Obtém o horário já existente no banco
    const horarioCheckIn = festival.data().expediente.horarios_sexta.check_in;

    btnCheckIn.addEventListener("click", async () => {
        const novoHorarioCheckIn = new Date();

        /**
         * Realiza o check-in do voluntário caso o mesmo ainda não tenha sido realizado
         */
        if (txtCredencial.readOnly = true && btnCheckIn.classList.contains("btn-danger") && horarioCheckIn === null) {
            await updateDoc(docFestivalRef, {
                "expediente.horarios_sexta.check_in": novoHorarioCheckIn               
            }).then(() => {
                console.log("Check-in realizado com sucesso");

                // Atualiza a página para exibir o novo horário de check-in e o status de ativo
                document.getElementById("corpoTabelaDeListagemDeVoluntarios").querySelector("#" + idVoluntario).querySelector("#check-in").textContent = new Date(novoHorarioCheckIn).toLocaleTimeString("pt-BR", { hour12: false });
                tornaVoluntarioAtivo(idVoluntario);  

                // Bloqueia o botão de check-in e desbloqueia o botão de check-out
                bloquearBtnCheckIn();
                desbloquearCheckOut();

                // Permite o resgate de hapi
                desbloquearInicioIntervalo();
                desbloquearResgateHapi();

                // Bloqueia o resgate de voucher
                bloquearResgateVoucher();
                bloquearTerminoIntervalo();
            }).catch((erro) => {
                console.error("Erro ao realizar check-in: ", erro);
            });            
        }
    });
});

/**
 * Desabilita o botão de check-in e exibe o horário no texto de botão
 */
function bloquearBtnCheckIn() {
    txtCheckIn.textContent = new Date().toLocaleTimeString("pt-BR", { hour12: false });

    btnCheckIn.classList.remove("btn-danger");
    btnCheckIn.classList.add("btn-outline-danger");
    btnCheckIn.disabled = true;
}

/**
 * Altera o badge de status do voluntário, tornando-o ativo no festival
 * @param {*} voluntario - ID do voluntário
 */
export function tornaVoluntarioAtivo(voluntario) {
    const statusVoluntario = document.getElementById(voluntario).querySelector("#statusVoluntario");

    statusVoluntario.textContent = " Ativo ";
    statusVoluntario.classList.add("text-bg-success");

    statusVoluntario.classList.remove("text-bg-danger");    // Caso o voluntário esteja inativo
    statusVoluntario.classList.remove("text-bg-warning");   // Caso o voluntário esteja em intervalo
}