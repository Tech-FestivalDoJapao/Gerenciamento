// Initializa a integração com o Firebase
import { db } from "./../firebaseConfig.mjs";
import { collection, doc, query, where, getDoc, getDocs, orderBy } from "firebase/firestore";

// Obtém o ano da edição atual do festival
const edicaoAtualFestival = "2024";

// Obtém a lista de voluntários do banco de dados
const voluntarioCollection = collection(db, 'voluntario');
const voluntarioSnapshot = await getDocs(voluntarioCollection);

voluntarioSnapshot.forEach(async (voluntarioDoc) => {
    const voluntario = voluntarioDoc.data();

    const nomeCompletoVoluntario = voluntario.nome_completo_voluntario;
    const emailVoluntario = voluntario.contato.email_voluntario;
    const contatoVoluntario = voluntario.contato.celular_voluntario;

    // Acessa a subcoleção "festival" e obtém o documento com edição atual do festival na subcoleção "festival" para o voluntario
    const festivalCollection = doc(voluntarioDoc.ref, 'festival', edicaoAtualFestival);
    const festivalSnapshot = await getDoc(festivalCollection);
    const festival = festivalSnapshot.data();

    const codigoCredencial = (festival.codigo_credencial_voluntario)
        ? festival.codigo_credencial_voluntario
        : " - ";

    /**
     * TODO: Obtém o dia da semana atual para exibir os horários de check-in, checkout e intervalos do voluntário para cada dia do evento
     */
    
    /**
     * Torna as datas de check-in, check-out e intervalo legíveis
     */
    const checkIn = (festival.expediente.horarios_sexta.check_in)
        ? new Date(festival.expediente.horarios_sexta.check_in * 1000).toLocaleTimeString('pt-BR')
        : " - ";
    const inicioIntervalo = (festival.expediente.horarios_sexta.intervalo.intervalo_1.inicio_intervalo)
        ? new Date(festival.expediente.horarios_sexta.intervalo.intervalo_1.inicio_intervalo * 1000).toLocaleTimeString('pt-BR')
        : " - ";
    const fimIntervalo = (festival.expediente.horarios_sexta.intervalo.intervalo_1.termino_intervalo)
        ? new Date(festival.expediente.horarios_sexta.intervalo.intervalo_1.termino_intervalo * 1000).toLocaleTimeString('pt-BR')
        : " - ";
    const checkOut = (festival.expediente.horarios_sexta.check_out)
        ? new Date(festival.expediente.horarios_sexta.check_out * 1000).toLocaleTimeString('pt-BR')
        : " - ";

    /**
     * Verifica se o voluntário está ativo, em intervalo, inativo ou se já finalizou o expediente
     */
    const status = ((checkIn != " - ") && (checkOut == " - ") && (inicioIntervalo == " - ") && (fimIntervalo == " - "))
        ? "<span id='statusVoluntario' class='badge rounded-pill text-bg-success'> Ativo </span>"
        : ((checkIn != " - ") && (checkOut == " - ") && (inicioIntervalo != " - ") && (fimIntervalo == " - "))
            ? "<span id='statusVoluntario' class='badge rounded-pill text-bg-warning'> Intervalo </span>"
            : ((checkIn != " - ") && (checkOut == " - ") && (inicioIntervalo != " - ") && (fimIntervalo != " - "))
                ? "<span id='statusVoluntario' class='badge rounded-pill text-bg-success'> Ativo </span>"
                : "<span id='statusVoluntario' class='badge rounded-pill text-bg-danger'> Inativo </span>";

    /**
     * Insere os dados do voluntário na tabela de listagem de voluntários (corpoTabelaDeListagemDeVoluntarios)
     */
    document.getElementById("corpoTabelaDeListagemDeVoluntarios").innerHTML +=
        `<tr id="${voluntarioDoc.id}">
            <th scope="row">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${voluntarioDoc.id}" id="selecionaVoluntario" />
                </div>
            </th>
            <td>
                <div class="d-flex align-items-center">
                    <div class="ms">
                        <p class="fw-semibold mb-0"> ${nomeCompletoVoluntario} </p>
                        <p class="text-muted mb-0"> ${emailVoluntario} </p>
                    </div>
                </div>
            </td>
            <td>
                <p class="fw-normal mb-1"> ${contatoVoluntario} </p>
            </td>
            <td>
                ${status}
            </td>
            <td>
                <p class="text-center" id="credencial"> ${codigoCredencial} </p>
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
    const docVoluntario = voluntarioSnapshot.docs.find((doc) => doc.id === identificaVoluntarioRemocao);
    const nomeVoluntario = docVoluntario.data().nome_completo_voluntario;

    document.getElementById("identificaRegistroVoluntario").innerText = `${docVoluntario.id}`;
    document.getElementById("nomeVoluntarioCandidatoRemocao").innerText = `${nomeVoluntario}`;
});

/**
 * Identifica o id do voluntário e a data de inscrição no modal de perfil do voluntário
 */
document.getElementById("corpoTabelaDeListagemDeVoluntarios").addEventListener("click", (event) => {
    const idVoluntarioPerfil = event.target.closest("tr").id;

    const docVoluntario = voluntarioSnapshot.docs.find((doc) => doc.id === idVoluntarioPerfil);
    const inscricaoVoluntario = doc(docVoluntario.ref, 'festival', edicaoAtualFestival).data_inscricao;
    const dataInscricaoVoluntario = new Date(inscricaoVoluntario * 1000).toLocaleDateString('pt-BR');

    //console.assert("Dados do voluntário: ", docVoluntario.data());
    document.getElementById("docVoluntarioPerfil").innerHTML = `ID: ${docVoluntario.id} | Voluntário desde ${dataInscricaoVoluntario}`;
});

/**
 * Identifica o voluntário que receberá os recursos do festival através do offcanvas de gerenciamento de recursos
 */
document.getElementById("corpoTabelaDeListagemDeVoluntarios").addEventListener("click", (event) => {
    const idVoluntarioPerfil = event.target.closest("tr").id;
    const docVoluntario = voluntarioSnapshot.docs.find((doc) => doc.id === idVoluntarioPerfil);

    document.getElementById("nomeVoluntarioGerenciado").innerText = `${docVoluntario.data().nome_completo_voluntario}`;
    document.getElementById("gestaoRecusosVoluntarioNoFestival").innerText = `${docVoluntario.id}`;
});

/**
 * Selecionar e deselecionar todos os voluntários da lista de voluntários através do checkbox de seleção
 * no cabeçalho da tabela de listagem de voluntários
 */
document.getElementById("selecionaVoluntarioNaTabela").addEventListener("click", (event) => {
    const selecionarVoluntarios = document.querySelectorAll("#selecionaVoluntario");

    // Verifica se o checkbox de seleção de todos os voluntários está marcado
    if (event.target.checked) {
        try {
            selecionarVoluntarios.forEach((voluntarioSelecionado) => {
                // Marca todos os checkboxes de voluntários como selecionados
                voluntarioSelecionado.checked = true;
            });
        } catch (erro) {
            console.erro("Não foi possível selecionar todos os voluntários da lista", erro);
        }
    }

    // Verifica se o checkbox de seleção de todos os voluntários está desmarcado
    if (!event.target.checked) {
        try {
            selecionarVoluntarios.forEach((voluntarioSelecionado) => {
                // Desmarca todos os checkboxes de voluntários
                voluntarioSelecionado.checked = false;
            });
        } catch (erro) {
            console.erro("Não foi possível deselecionar todos os voluntários da lista", erro);
        }
    }
});

/**
 * Atualiza a lista de voluntários após alguma ação como adição, remoção ou atualização dos dados de um voluntário
 */
document.getElementById("corpoTabelaDeListagemDeVoluntarios").click();