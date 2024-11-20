// Initializa a integração com o Firebase
import { db } from "../../firebaseConfig.mjs";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import '../lista.mjs';

// Obtém o ano da edição atual do festival
import { edicaoAtualFestival } from "../lista.mjs";

// Obtém as funções de bloqueio e desbloqueio dos campos referntes ao turno do voluntário
import { bloquearInicioIntervalo, bloquearTerminoIntervalo } from "./turno.mjs";
import { bloquearResgateHapi } from "./resgate_hapi.mjs";
import { bloquearResgateVoucher } from "./resgate_voucher.mjs";

// Obtém os elementos referentes ao checkout do voluntário
const btnCheckOut = document.getElementById("cadastraCheckOut");
const txtCheckOut = document.getElementById("horarioCheckOut");

// Obtém os elementos referentes ao check-in e ao código de credencial do voluntário
const btnCheckIn = document.getElementById("cadastraCheckIn");
const txtCredencial = document.getElementById("codigoCredencial");

/**
 * Associa um horário de checkout ao voluntário e o torna inativo no festival
 */
document.getElementById("corpoTabelaDeListagemDeVoluntarios").addEventListener("click", async (event) => {
    // Acessa as informações do voluntário
    const idVoluntario = event.target.closest("tr").id;
    const docVoluntarioRef = doc(db, "voluntario", idVoluntario);
    const docFestivalRef = doc(docVoluntarioRef, 'festival', edicaoAtualFestival);
    const festival = await getDoc(docFestivalRef);

    // Obtém o horário já existente no banco
    const horarioCheckOut = festival.data().expediente.horarios_sexta.check_out;
    if (horarioCheckOut !== null) {
        bloquearRecursos();
    }

    btnCheckOut.addEventListener("click", async () => {
        const novoHorarioCheckOut = new Date();

        /**
         * Realiza o check-in do voluntário caso o mesmo ainda não tenha sido realizado
         */
        if (txtCredencial.readOnly = true && btnCheckOut.classList.contains("btn-danger") && horarioCheckOut === null) {
            await updateDoc(docFestivalRef, {
                "expediente.horarios_sexta.check_out": novoHorarioCheckOut               
            }).then(() => {
                console.log("Check-out realizado com sucesso");

                // Atualiza a página para exibir o novo horário de check-out e o status de inativo
                document.getElementById("corpoTabelaDeListagemDeVoluntarios").querySelector("#" + idVoluntario).querySelector("#checkout").textContent = new Date(novoHorarioCheckOut).toLocaleTimeString("pt-BR", { hour12: false });
                tornaVoluntarioInativo(idVoluntario);

                // Bloqueia a eição de horários e recursos do voluntário
                bloquearRecursos();
            }).catch((erro) => {
                console.error("Erro ao realizar check-out: ", erro);
            });
        }
    });
});

/**
 * Desabilita o botão de checkout e exibe o horário no texto de botão
 */
function bloquearCheckOut() {
    txtCheckOut.textContent = new Date().toLocaleTimeString("pt-BR", { hour12: false });

    btnCheckOut.classList.remove("btn-danger");
    btnCheckOut.classList.add("btn-outline-danger");
    btnCheckOut.disabled = true;
}

/**
 * Altera o badge de status do voluntário, tornando-o inativo no festival
 * @param {*} voluntario - ID do voluntário 
 */
function tornaVoluntarioInativo(voluntario) {
    const statusVoluntario = document.getElementById(voluntario).querySelector("#statusVoluntario");
    
    statusVoluntario.textContent = " Inativo ";
    statusVoluntario.classList.add("text-bg-danger");

    statusVoluntario.classList.remove("text-bg-warning"); // Caso o voluntário esteja em intervalo
    statusVoluntario.classList.remove("text-bg-success"); // Caso o voluntário esteja ativo
}

/**
 * Desabilita os campos de recursos do voluntário após o check-out
 */
function bloquearRecursos() {
    // Bloqueia o botão de check-out
    bloquearCheckOut();

    // Bloqueia as opções de intervalo	
    bloquearInicioIntervalo();
    bloquearTerminoIntervalo();

    // Bloqueia os campos relacionados à recursos utilizados pelo voluntário
    bloquearResgateHapi();
    bloquearResgateVoucher();
}