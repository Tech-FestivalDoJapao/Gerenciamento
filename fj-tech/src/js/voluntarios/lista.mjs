// Initializa a integração com o Firebase
import { db } from "./../firebaseConfig.mjs";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

// Obtém o ano da edição atual do festival
export const edicaoAtualFestival = "2024";

// Obtém a lista de voluntários do banco de dados ordenando-os em ordem alfabética
const voluntarioCollection = query(collection(db, "voluntario"), where("nome_completo_voluntario", "!=", null));
const voluntarioSnapshot = await getDocs(voluntarioCollection);

// Obtém o documento com os dados do voluntário e atualiza a lista de voluntários em tempo real
voluntarioSnapshot.docChanges().forEach(async (change) => {
    if (change.type === "added" || change.type === "modified") {
        // Adiciona novo voluntário à lista
        const voluntarioDoc = change.doc;
        const voluntario = voluntarioDoc.data();

        const nomeCompletoVoluntario = voluntario.nome_completo_voluntario;
        const emailVoluntario = voluntario.contato.email_voluntario;
        // Remove o prefixo "+55 " do número de celular do voluntário, mantendo apenas o DDD e o número de celular
        const contatoVoluntario = voluntario.contato.celular_voluntario.replace("+55 ", "");

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
         * Verifica se o voluntário está ativo, em intervalo, inativo ou se já finalizou o expediente para definir o status
         */
        const status = ((checkIn != " - ") && (checkOut == " - ") && (inicioIntervalo == " - ") && (fimIntervalo == " - "))
            ? "<span id='statusVoluntario' class='badge rounded-pill text-bg-success'> Ativo </span>"
            : ((checkIn != " - ") && (checkOut == " - ") && (inicioIntervalo != " - ") && (fimIntervalo == " - "))
                ? "<span id='statusVoluntario' class='badge rounded-pill text-bg-warning'> Intervalo </span>"
                : ((checkIn != " - ") && (checkOut == " - ") && (inicioIntervalo != " - ") && (fimIntervalo != " - "))
                    ? "<span id='statusVoluntario' class='badge rounded-pill text-bg-success'> Ativo </span>"
                    : "<span id='statusVoluntario' class='badge rounded-pill text-bg-danger'> Inativo </span>";

        // Lista o voluntário
        listaVoluntarioNaTabela(voluntarioDoc, nomeCompletoVoluntario, emailVoluntario, contatoVoluntario, status, codigoCredencial, checkIn, checkOut);
    }

    /**
     * Insere os dados do voluntário na tabela de listagem de voluntários (corpoTabelaDeListagemDeVoluntarios)
     * 
     * @param {*} voluntarioDoc - Documento com os dados do voluntário
     * @param {*} nomeCompletoVoluntario - Nome completo do voluntário
     * @param {*} emailVoluntario - Email do voluntário
     * @param {*} contatoVoluntario - Contato do voluntário
     * @param {*} status - Status do voluntário
     * @param {*} codigoCredencial - Código da credencial do voluntário
     * @param {*} checkIn - Horário de check-in do voluntário
     * @param {*} checkOut - Horário de check-out do voluntário
     */
    function listaVoluntarioNaTabela(voluntarioDoc, nomeCompletoVoluntario, emailVoluntario, contatoVoluntario, status, codigoCredencial, checkIn, checkOut) {
        // Cria uma nova linha para inserir as informações do voluntário
        const linhaVoluntarioListado = document.createElement("tr");
        linhaVoluntarioListado.id = voluntarioDoc.id;

        // Insere a linha do voluntário na tabela de listagem de voluntários
        const colunaDeSelecaoDeVoluntario = document.createElement("th");
        colunaDeSelecaoDeVoluntario.scope = "row";
        colunaDeSelecaoDeVoluntario.classList.add("d-none", "d-lg-table-cell");
        const divCheckboxSelecao = document.createElement("div");
        divCheckboxSelecao.classList.add("form-check");
        const checkboxSelecao = document.createElement("input");
        checkboxSelecao.classList.add("form-check-input");
        checkboxSelecao.type = "checkbox";
        checkboxSelecao.value = voluntarioDoc.id;
        checkboxSelecao.id = "selecionaVoluntario";
        divCheckboxSelecao.appendChild(checkboxSelecao);
        colunaDeSelecaoDeVoluntario.appendChild(divCheckboxSelecao);
        linhaVoluntarioListado.appendChild(colunaDeSelecaoDeVoluntario);

        // Insere o nome e o email do voluntário na tabela de listagem de voluntários
        const colunaDeNomeEEmail = document.createElement("td");
        const divNomeEEmail = document.createElement("div");
        divNomeEEmail.classList.add("d-flex", "align-items-center");
        const grupoNomeEmail = document.createElement("div");
        grupoNomeEmail.classList.add("ms");
        const txtNome = document.createElement("p");
        txtNome.classList.add("fw-semibold", "mb-0");
        txtNome.textContent = nomeCompletoVoluntario;
        const txtEmail = document.createElement("p");
        txtEmail.classList.add("text-muted", "mb-0", "d-none", "d-md-table-cell");
        txtEmail.textContent = emailVoluntario;
        txtEmail.style.overflowWrap = "anywhere";
        grupoNomeEmail.appendChild(txtNome);
        grupoNomeEmail.appendChild(txtEmail);
        divNomeEEmail.appendChild(grupoNomeEmail);
        colunaDeNomeEEmail.appendChild(divNomeEEmail);
        linhaVoluntarioListado.appendChild(colunaDeNomeEEmail);

        // Insere o contato do voluntário na tabela de listagem de voluntários
        const colunaDeContato = document.createElement("td");
        const txtContato = document.createElement("p");
        txtContato.classList.add("fw-normal", "mb-1");
        txtContato.textContent = contatoVoluntario;
        colunaDeContato.appendChild(txtContato);
        linhaVoluntarioListado.appendChild(colunaDeContato);

        // Insere o status do voluntário na tabela de listagem de voluntários
        const colunaDeStatus = document.createElement("td");
        colunaDeStatus.innerHTML = status;
        linhaVoluntarioListado.appendChild(colunaDeStatus);

        // Insere a credencial do voluntário na tabela de listagem de voluntários
        const colunaDeCredencial = document.createElement("td");
        const txtCredencial = document.createElement("p");
        txtCredencial.classList.add("text-center");
        txtCredencial.id = "credencial";
        txtCredencial.textContent = codigoCredencial;
        colunaDeCredencial.appendChild(txtCredencial);
        linhaVoluntarioListado.appendChild(colunaDeCredencial);

        // Insere o horário de check-in do voluntário na tabela de listagem de voluntários
        const colunaDeCheckIn = document.createElement("td");
        colunaDeCheckIn.classList.add("d-none", "d-md-table-cell");
        const txtCheckIn = document.createElement("p");
        txtCheckIn.classList.add("text-center");
        txtCheckIn.id = "check-in";
        txtCheckIn.textContent = checkIn;
        colunaDeCheckIn.appendChild(txtCheckIn);
        linhaVoluntarioListado.appendChild(colunaDeCheckIn);

        // Insere o horário de check-out do voluntário na tabela de listagem de voluntários
        const colunaDeCheckOut = document.createElement("td");
        colunaDeCheckOut.classList.add("d-none", "d-md-table-cell");
        const txtCheckOut = document.createElement("p");
        txtCheckOut.classList.add("text-center");
        txtCheckOut.id = "checkout";
        txtCheckOut.textContent = checkOut;
        colunaDeCheckOut.appendChild(txtCheckOut);
        linhaVoluntarioListado.appendChild(colunaDeCheckOut);

        // Insere as ações disponíveis para o voluntário na tabela de listagem de voluntários
        const colunaDeAcoes = document.createElement("td");
        const grupoDeAcoes = document.createElement("div");
        grupoDeAcoes.classList.add("btn-group", "btn-group-sm", "gap-1");
        grupoDeAcoes.role = "group";
        const btnGerenciaVoluntario = document.createElement("button");
        btnGerenciaVoluntario.type = "button";
        btnGerenciaVoluntario.classList.add("btn", "btn-outline-danger");
        btnGerenciaVoluntario.id = "GerenciarRecursosDoVoluntarioNoFestival";
        btnGerenciaVoluntario.dataset.bsToggle = "offcanvas";
        btnGerenciaVoluntario.dataset.bsTarget = "#offcanvasRight";
        btnGerenciaVoluntario.ariaControls = "offcanvasRight";
        btnGerenciaVoluntario.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" data-bs-toggle="tooltip" data-bs-title="Gerenciar horário e recursos do voluntário">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg>`;
        grupoDeAcoes.appendChild(btnGerenciaVoluntario);
        const btnPerfilVoluntario = document.createElement("button");
        btnPerfilVoluntario.type = "button";
        btnPerfilVoluntario.classList.add("btn", "btn-outline-danger");
        btnPerfilVoluntario.dataset.bsToggle = "modal";
        btnPerfilVoluntario.dataset.bsTarget = "#PerfilVoluntarioModal";
        btnPerfilVoluntario.id = "AcessarPerfilVoluntario";
        btnPerfilVoluntario.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16" data-bs-toggle="tooltip" data-bs-title="Acessar perfil do voluntário"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>`;
        grupoDeAcoes.appendChild(btnPerfilVoluntario);
        const btnExcluiVoluntario = document.createElement("button");
        btnExcluiVoluntario.type = "button";
        btnExcluiVoluntario.classList.add("btn", "btn-outline-danger", "d-none", "d-lg-table-cell");
        btnExcluiVoluntario.id = "RemoverVoluntario";
        btnExcluiVoluntario.dataset.bsToggle = "modal";
        btnExcluiVoluntario.dataset.bsTarget = "#RemoverVoluntarioModal";
        btnExcluiVoluntario.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" data-bs-toggle="tooltip" data-bs-title="Remover voluntário"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/></svg>`;
        grupoDeAcoes.appendChild(btnExcluiVoluntario);
        colunaDeAcoes.appendChild(grupoDeAcoes);
        linhaVoluntarioListado.appendChild(colunaDeAcoes);

        document.getElementById("corpoTabelaDeListagemDeVoluntarios").appendChild(linhaVoluntarioListado);
    }
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
 * Identifica o voluntário que receberá a ação na listagem de voluntários e popula os campos relacionados à ele para cada ação
 */
const listadeDeVoluntarios = document.getElementById("corpoTabelaDeListagemDeVoluntarios");
listadeDeVoluntarios.addEventListener("click", (event) => {
    const idVoluntario = event.target.closest("tr").id;
    const docVoluntario = voluntarioSnapshot.docs.find((doc) => doc.id === idVoluntario);

    // Informações dpo voluntário
    const identificaVoluntario = docVoluntario.id;
    const nomeVoluntario = docVoluntario.data().nome_completo_voluntario;

    /**
     * Identificação do voluntário no Modal de Confirmação de Remoção
     */
    document.getElementById("identificaRegistroVoluntario").innerText = `${identificaVoluntario}`;
    document.getElementById("nomeVoluntarioCandidatoRemocao").innerText = `${nomeVoluntario}`;

    /**
     * Identificação do voluntário no OffCanvas de Gerenciamento de Recursos 
     */
    document.getElementById("gestaoRecusosVoluntarioNoFestival").innerText = `${identificaVoluntario}`;
    document.getElementById("nomeVoluntarioGerenciado").innerText = `${nomeVoluntario}`;
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
listadeDeVoluntarios.click();

const campoDeBusca = document.getElementById("buscaVoluntarioNaTabela");
    campoDeBusca.classList.add("border-0", "border-bottom", "border-danger", "border-opacity-75");