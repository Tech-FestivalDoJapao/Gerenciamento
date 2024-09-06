// Initializa a integração com o Firebase
import { db } from "../../firebaseConfig.mjs";
import { doc, getDoc, Timestamp } from "firebase/firestore";

import '../lista.mjs';

// Obtém o ano a edição atual do festival
const edicaoAtualFestival = "2024";
// Obtém os elementos referentes ao início e final de expediente do voluntário
const btnCheckIn = document.getElementById("cadastraCheckIn");
const btnCheckOut = document.getElementById("cadastraCheckOut");
const txtCheckIn = document.getElementById("horarioCheckIn");
const txtCheckOut = document.getElementById("horarioCheckOut");
// Obtém os elementos referentes aos horários de intervalo do voluntário
const btnIniciaIntervalo = document.getElementById("cadastraInicioIntervalo");
const btnFinalizaIntervalo = document.getElementById("cadastraTerminoIntervalo");
const divIntervalos = document.getElementById("horariosDeIntervalo");

/**
 * Exibe as informações refentes à edição atual do festival relacionadas ao voluntário
 * no offcanvas de gestão de recursos do voluntário no festival
 */
document.getElementById("corpoTabelaDeListagemDeVoluntarios").addEventListener("click", async (event) => {
    const idVoluntarioGerenciado = event.target.closest("tr").id;
    
    const docVoluntarioRef = doc(db, "voluntario", idVoluntarioGerenciado);
    const docFestivalRef = doc(docVoluntarioRef, 'festival', edicaoAtualFestival);
    const festival = await getDoc(docFestivalRef);

    // Obtém os horários associados ao voluntário
    const horarioCheckIn = festival.data().expediente.horarios_sexta.check_in;
    const horarioCheckOut = festival.data().expediente.horarios_sexta.check_out;
    const horariosIntervalo = festival.data().expediente.horarios_sexta.intervalo;
        //console.log(horariosIntervalo);

    /**
     * Ativa apenas a opção de check-in caso não haja nenhum horário cadastrado
     */
    if (horarioCheckIn === null && horarioCheckOut === null) {
        desbloquearCheckIn();
        bloquearCheckOut();

        btnCheckOut.disabled = false;
        btnCheckOut.style.cursor = "not-allowed";
        btnCheckOut.setAttribute("block", true);

        return;
    }

    /**
     * Ativa a opção de checkout e bloqueia o check-in caso o voluntário já tenha realizado o checkin
     */
    if (horarioCheckIn !== null && horarioCheckOut === null) {
        bloquearCheckIn(horarioCheckIn);
        desbloquearCheckOut();

        return;
    }

    /**
     * Bloqueia as opções de check-in e checkout caso o voluntário já tenha realizado ambos
     */
    if (horarioCheckIn !== null && horarioCheckOut !== null) {
        bloquearCheckIn(horarioCheckIn);
        bloquearCheckOut(horarioCheckOut);

        return;
    }

    // Caso nenhuma das condições acima seja atendida, desbloqueia a opção de check-in por padrão
    desbloquearCheckIn();
});

/**
 * Desabilita o botão de registro de check-in e atualiza o texto do botão com o horário de check-in
 * cadastrado no banco de dados
 * @param {Timestamp} horarioCheckIn 
 */
function bloquearCheckIn(horarioCheckIn) {
    txtCheckIn.textContent = new Date(horarioCheckIn * 1000).toLocaleTimeString();

    btnCheckIn.disabled = true;
    btnCheckIn.classList.remove("btn-danger");
    btnCheckIn.classList.add("btn-outline-danger");
}
/**
 * Habilita o botão de registro de check-in e atualiza o texto do botão com "Check-In"
 */
function desbloquearCheckIn() {
    txtCheckIn.textContent = "Check-In";

    btnCheckIn.disabled = false;
    btnCheckIn.classList.remove("btn-outline-danger");
    btnCheckIn.classList.add("btn-danger");
}

/**
 * DEsabilita o botão de registro de checkout e atualiza o texto do botão com o horário de checkout
 * cadastrado no banco de dados
 * @param {Timestamp} horarioCheckOut 
 */
function bloquearCheckOut(horarioCheckOut) {
    const checkout = horarioCheckOut
        ? new Date(horarioCheckOut * 1000).toLocaleTimeString()
        : "Checkout";

    txtCheckOut.textContent = checkout;

    btnCheckOut.disabled = true;
    btnCheckOut.classList.remove("btn-danger");
    btnCheckOut.classList.add("btn-outline-danger");
}
/**
 * Habilita o botão de registro de checkout e atualiza o texto do botão com "Checkout"
 */
function desbloquearCheckOut() {
    txtCheckOut.textContent = "Checkout";

    btnCheckOut.disabled = false;
    btnCheckOut.style.cursor = "pointer";
    btnCheckOut.classList.remove("btn-outline-danger");
    btnCheckOut.classList.add("btn-danger");
}

/**
 * TODO: Valida as informações de início e término do intervalo baseado no turno do voluntário
 * criar funções para bloquear e desbloquear os botões de início e término de intervalo
 */