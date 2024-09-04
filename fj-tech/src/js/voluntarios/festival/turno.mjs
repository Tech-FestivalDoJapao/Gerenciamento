// Initializa a integração com o Firebase
import { db } from "./../../firebaseConfig.mjs";
import { doc, getDoc } from "firebase/firestore";

import './../lista.mjs';

/**
 * Informações de check-in e check-out do voluntário
 */
document.getElementById("GerenciarRecursosDoVoluntarioNoFestival").addEventListener("click", async () => {
    const IdVoluntarioGerenciado = document.getElementById("gestaoRecusosVoluntarioNoFestival").textContent;
    console.log(IdVoluntarioGerenciado);

    // Preenche com os dados pré cadastrados na Ficha de Disponibilidade do Voluntário para a edição vigente
    try {
        // Obtem o perfil do voluntário
        const docVoluntarioGestao = doc(db, "voluntario", IdVoluntarioGerenciado);
        const voluntarioGerenciado = await getDoc(docVoluntarioGestao);

        // Atualiza os dados em caso de outro voluntário for selecionado
        if (IdVoluntarioGerenciado !== voluntarioGerenciado.id) {
            const docVoluntarioGestao = doc(db, "voluntario", IdVoluntarioGerenciado);
            const voluntarioGerenciado = await getDoc(docVoluntarioGestao);

            return voluntarioGerenciado;
        }

        const checkInCadastrado = voluntarioGerenciado.data().voluntariado.horarios.horario_checkin
            ? "Check-in realizado " + new Date(voluntarioGerenciado.data().voluntariado.horarios.horario_checkin * 1000).toLocaleTimeString('pt-BR')
            : "Check-in pendente";

        const checkOutCadastrado = voluntarioGerenciado.data().voluntariado.horarios.horario_checkout
            ? "Checkout realizado " + new Date(voluntarioGerenciado.data().voluntariado.horarios.horario_checkout * 1000).toLocaleTimeString('pt-BR')
            : "Checkout pendente";

        // Horários de CheckIn e CheckOut previstos
        document.getElementById("horarioCheckIn").innerText = `${checkInCadastrado}`;
        document.getElementById("horarioCheckOut").innerText = `${checkOutCadastrado}`;
    } catch (erro) {
        console.error("Erro ao obter os horários de turno do voluntário: ", erro);
    }
});