// Initializa a integração com o Firebase
import { db } from "../../firebaseConfig.mjs";
import { doc, getDoc, Timestamp } from "firebase/firestore";

import '../lista.mjs';

// Obtém o ano a edição atual do festival
const edicaoAtualFestival = "2024";
// Obtém o elmento referente à credencia do voluntário
const txtCredencial = document.getElementById("codigoCredencial");
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

    clearTimeData();
    
    const docVoluntarioRef = doc(db, "voluntario", idVoluntarioGerenciado);
    const docFestivalRef = doc(docVoluntarioRef, 'festival', edicaoAtualFestival);
    const festival = await getDoc(docFestivalRef);

    // Obtém os horários associados ao voluntário
    const horarioCheckIn = festival.data().expediente.horarios_sexta.check_in;
    const horarioCheckOut = festival.data().expediente.horarios_sexta.check_out;
    const horariosIntervalo = festival.data().expediente.horarios_sexta.intervalo;
        const horarioInicioIntervalo = horariosIntervalo.intervalo_1.inicio_intervalo;
        const horarioTerminoIntervalo = horariosIntervalo.intervalo_1.termino_intervalo;

    /**
     * Ativa apenas a opção de check-in caso não haja nenhum horário cadastrado
     */
    if (horarioCheckIn === null && horarioCheckOut === null) {
        if (txtCredencial === null) {
            bloquearCheckIn(null);
        }
        bloquearCheckOut(null);

        bloquearInicioIntervalo();
        bloquearTerminoIntervalo();

        return;
    }

    /**
     * Ativa a opção de checkout e bloqueia o check-in caso o voluntário já tenha realizado o checkin
     */
    if (horarioCheckIn !== null && horarioCheckOut === null) {
        bloquearCheckIn(horarioCheckIn);
        desbloquearCheckOut();

        /**
         * Ativa a opção de iniciar um intervalo caso o usuário já tenha realizado o check-in 
         * e não haja nenhum intervalo cadastrado
         */
        if (horarioInicioIntervalo === null && horarioTerminoIntervalo === null) {
            desbloquearInicioIntervalo();
            bloquearTerminoIntervalo();

            return;
        }

        /**
         * Ativa a opção de finalizar um intervalo caso o usuário já tenha iniciado um intervalo
         * e ainda não tenha finalizado
         */
        if (horarioInicioIntervalo !== null && horarioTerminoIntervalo === null) {
            bloquearInicioIntervalo();
            desbloquearTerminoIntervalo();

            return;
        }

        /**
         * Ativa a opção de iniciar um intervalo caso o usuário já tenha finalizado um intervalo
         * e ainda não tenha iniciado outro
         */
        if (horarioInicioIntervalo !== null && horarioTerminoIntervalo !== null) {
            desbloquearInicioIntervalo();
            bloquearTerminoIntervalo();

            return;
        }

        // Exibe os intervalos realizados pelo voluntário
        exibeIntervalos(horariosIntervalo);

        return;
    }

    /**
     * Bloqueia as opções de check-in e checkout caso o voluntário já tenha realizado ambos
     */
    if (horarioCheckIn !== null && horarioCheckOut !== null) {
        bloquearCheckIn(horarioCheckIn);
        bloquearCheckOut(horarioCheckOut);

        bloquearInicioIntervalo();
        bloquearTerminoIntervalo();

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
    txtCheckIn.textContent = new Date(horarioCheckIn.toDate()).toLocaleTimeString("pt-BR", { hour12: false });

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
 * Desabilita o botão de registro de checkout e atualiza o texto do botão com o horário de checkout
 * cadastrado no banco de dados
 * @param {Timestamp} horarioCheckOut 
 */
function bloquearCheckOut(horarioCheckOut) {
    const checkout = horarioCheckOut
        ? new Date(horarioCheckOut.toDate()).toLocaleTimeString("pt-BR", { hour12: false })
        : "Checkout";

    txtCheckOut.textContent = checkout;

    btnCheckOut.disabled = true;
    btnCheckOut.classList.remove("btn-danger");
    btnCheckOut.classList.add("btn-outline-danger");
}
/**
 * Habilita o botão de registro de checkout e atualiza o texto do botão com "Checkout"
 */
export function desbloquearCheckOut() {
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

/**
 * Exibe as informações referentes ao(s) intervalo(s) realizado pelo voluntário
 * @param {Object} horariosIntervalo
 */
function exibeIntervalos(intervalo) {
    if (intervalo.intervalo_1 !== null) {
        divIntervalos.innerHTML = `
            <small class="opacity-50 m-0">
                <ul class="list-group">
                    <li class="list-group px-4">
                        ${new Date(intervalo.intervalo_1.inicio_intervalo * 1000).toLocaleTimeString("pt-BR", { hour12: false })} • ${new Date(intervalo.intervalo_1.termino_intervalo * 1000).toLocaleTimeString("pt-BR", { hour12: false })}
                    </li>
                </ul>
            </small>`;
    }
}

/**
 * Desabilita o botão de início de intervalo
 */
function bloquearInicioIntervalo() {    
    btnIniciaIntervalo.disabled = true;
    btnIniciaIntervalo.classList.remove("btn-danger");
    btnIniciaIntervalo.classList.add("btn-outline-danger");
}

/**
 * Habilita o botão de início de intervalo e o destaca
 */
export function desbloquearInicioIntervalo() {
    btnIniciaIntervalo.disabled = false;
    btnIniciaIntervalo.classList.remove("btn-outline-danger");
    btnIniciaIntervalo.classList.add("btn-danger");
}

/**
 * Desabilita o botão de término de intervalo
 */
export function bloquearTerminoIntervalo() {
    btnFinalizaIntervalo.disabled = true;
    btnFinalizaIntervalo.classList.remove("btn-danger");
    btnFinalizaIntervalo.classList.add("btn-outline-danger");
}

/**
 * Habilita o botão de término de intervalo e o destaca
 */
function desbloquearTerminoIntervalo() {
    btnFinalizaIntervalo.disabled = false;
    btnFinalizaIntervalo.classList.remove("btn-outline-danger");
    btnFinalizaIntervalo.classList.add("btn-danger");
}

/**
 * Limpa os dados e o reseta o estado dos campos de horário do voluntário
 */
function clearTimeData() {
    txtCheckIn.textContent = "Check-In";
    btnCheckIn.classList.remove("btn-outline-danger");
    btnCheckIn.classList.add("btn-danger");

    txtCheckOut.textContent = "Checkout";
    divIntervalos.innerHTML = "";
}