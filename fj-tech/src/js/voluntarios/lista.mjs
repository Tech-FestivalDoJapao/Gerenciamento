// Initializa a integração com o Firebase
import { db } from "./../firebaseConfig.mjs";
import { collection, query, where, getDocs } from "firebase/firestore";

// Obtém a lista de voluntários do banco de dados
const queryVoluntarios = query(collection(db, "voluntario"), where("nome_completo_voluntario", "!=", null));
const querySnapshot = await getDocs(queryVoluntarios);

querySnapshot.forEach((doc) => {
    /**
     * Torna as datas de check-in, check-out e intervalo legíveis
     */
    const checkIn = (doc.data().voluntariado.horarios.horario_checkin)
        ? new Date(doc.data().voluntariado.horarios.horario_checkin * 1000).toLocaleTimeString('pt-BR')
        : " - ";
    const inicioIntervalo = (doc.data().voluntariado.horarios.horario_intervalo.inicio_intervalo)
        ? new Date(doc.data().voluntariado.horarios.horario_intervalo.inicio_intervalo * 1000).toLocaleTimeString('pt-BR')
        : " - ";
    const fimIntervalo = (doc.data().voluntariado.horarios.horario_intervalo.fim_intervalo)
        ? new Date(doc.data().voluntariado.horarios.horario_intervalo.fim_intervalo * 1000).toLocaleTimeString('pt-BR')
        : " - ";
    const checkOut = (doc.data().voluntariado.horarios.horario_checkout)
        ? new Date(doc.data().voluntariado.horarios.horario_checkout * 1000).toLocaleTimeString('pt-BR')
        : " - ";

    /**
     * Verifica se o voluntário está ativo, em intervalo, inativo ou se já finalizou o expediente
     */
    const status = ((checkIn != " - ") && (checkOut == " - ") && (inicioIntervalo == " - ") && (fimIntervalo == " - "))
        ? "<span class='badge rounded-pill text-bg-success'> Ativo </span>"
        : ((checkIn != " - ") && (checkOut == " - ") && (inicioIntervalo != " - ") && (fimIntervalo == " - "))
            ? "<span class='badge rounded-pill text-bg-warning'> Intervalo </span>"
            : ((checkIn != " - ") && (checkOut == " - ") && (inicioIntervalo != " - ") && (fimIntervalo != " - "))
                ? "<span class='badge rounded-pill text-bg-success'> Ativo </span>"
                : "<span class='badge rounded-pill text-bg-danger'> Inativo </span>";

    /**
     * Insere os dados do voluntário na tabela de listagem de voluntários (corpoTabelaDeListagemDeVoluntarios)
     */
    document.getElementById("corpoTabelaDeListagemDeVoluntarios").innerHTML +=
        `<tr id="${doc.id}">
            <th scope="row">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="selecionaVoluntario" />
                </div>
            </th>
            <td>
                <div class="d-flex align-items-center">
                    <div class="ms">
                        <p class="fw-semibold mb-0"> ${doc.data().nome_completo_voluntario} </p>
                        <p class="text-muted mb-0"> ${doc.data().contato_voluntario.email_voluntario} </p>
                    </div>
                </div>
            </td>
            <td>
                <p class="fw-normal mb-1"> ${doc.data().contato_voluntario.celular_voluntario} </p>
            </td>
            <td>
                ${status}
            </td>
            <td>
                <p class="text-center"> ${checkIn} </p>
            </td>
            <td>
                <p class="text-center"> ${checkOut} </p>
            </td>
            <td>
                <div class="btn-group btn-group-sm gap-1" role="group" aria-label="Small button group px-2">
                    <!-- Editar dados do voluntário no festival -->
                    <button type="button" class="btn btn-outline-danger" id="GerenciarRecursosDoVoluntarioNoFestival" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                        </svg>
                    </button>

                    <!-- Acessar perfil cadastral do voluntário -->
                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                        data-bs-target="#PerfilVoluntarioModal" id="AcessarPerfilVoluntario">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                    </button>

                    <!-- Excluir voluntário da lista do festival -->
                    <button type="button" class="btn btn-outline-danger" id="RemoverVoluntario"
                        data-bs-toggle="modal" data-bs-target="#RemoverVoluntarioModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path
                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>`;
});

/**
 * Busca de voluntários na tabela de listagem de voluntários por nome e exibe o resultado da pesquisa
 */
document.getElementById("buscaVoluntarioNaTabela").addEventListener("input", (event) => {
    const nomePesquisado = event.target.value.toLowerCase();
    const voluntarioListado = document.querySelectorAll("#corpoTabelaDeListagemDeVoluntarios tr");

    voluntarioListado.forEach((linha) => {
        const nomeVoluntario = linha.querySelector(".fw-semibold").textContent.toLowerCase();

        if (nomeVoluntario.includes(nomePesquisado)) {
            linha.style.display = "table-row";
        } else {
            linha.style.display = "none";
        }
    });
});

/**
 * Identifica o voluntário que será removido da listagem de voluntários e exibe o nome do voluntário no modal de 
 * confirmação de remoção
 */
document.getElementById("corpoTabelaDeListagemDeVoluntarios").addEventListener("click", (event) => {
    const identificaVoluntarioRemocao = event.target.closest("tr").id;
    const docVoluntario = querySnapshot.docs.find((doc) => doc.id === identificaVoluntarioRemocao);

    document.getElementById("identificaRegistroVoluntario").innerText = `${docVoluntario.id}`;
    document.getElementById("nomeVoluntarioCandidatoRemocao").innerText = `${docVoluntario.data().nome_completo_voluntario}`;
});

/**
 * Identifica o id do voluntário e a data de inscrição no modal de perfil do voluntário
 */
document.getElementById("corpoTabelaDeListagemDeVoluntarios").addEventListener("click", (event) => {
    const idVoluntarioPerfil = event.target.closest("tr").id;

    const docVoluntario = querySnapshot.docs.find((doc) => doc.id === idVoluntarioPerfil);
    const dataInscricaoVoluntario = new Date(docVoluntario.data().voluntariado.data_inscricao * 1000).toLocaleDateString('pt-BR');

    document.getElementById("docVoluntarioPerfil").innerHTML = `ID: ${docVoluntario.id} | Voluntário desde ${dataInscricaoVoluntario}`;
    
    // Identifica o voluntário que receberá os recursos do festival através do offcanvas de gerenciamento de recursos
    document.getElementById("nomeVoluntarioGerenciado").innerText = `${docVoluntario.data().nome_completo_voluntario}`;
});

