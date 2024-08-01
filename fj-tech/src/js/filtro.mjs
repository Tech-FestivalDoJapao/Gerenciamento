import './voluntarios/lista.mjs';

/**
 * Exibe as opções de filtragem de voluntário por status (ativo, inativo, intervalo) na tabela de listagem de voluntários
 */
const filtrarVoluntario = document.getElementById("filtroDeVoluntarioPorStatus");

filtrarVoluntario.addEventListener("click", (event) => {
    const corpoFiltro = document.getElementById("corpoFiltroDeVoluntarioPorStatus");

    // Exibe o card com as opções de filtro
    corpoFiltro.hasAttribute("hidden") 
        ? corpoFiltro.removeAttribute("hidden") 
        : corpoFiltro.hidden = true;

    // Posiciona o card ao lado do botão de filtro
    corpoFiltro.style.position = "absolute";
    corpoFiltro.style.left = filtrarVoluntario.offsetLeft + filtrarVoluntario.offsetWidth + "px";
    corpoFiltro.style.top = filtrarVoluntario.offsetTop + "px";
});

/**
 * Torna o card de filtro de voluntário móvel na tela
 */
tornarElementoMovel(document.getElementById("corpoFiltroDeVoluntarioPorStatus"));

function tornarElementoMovel(cardDeFiltro) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    cardDeFiltro.onmousedown = elementoMovel;

    // Inicia o movimento do elemento
    function elementoMovel(card) {
        card = card || window.event;
        card.preventDefault();

        // Pega a posição inicial do cursor:
        pos3 = card.clientX;
        pos4 = card.clientY;
        document.onmouseup = paraDeMoverElemento;
        document.onmousemove = moveElemento;
    }

    // Move o elemento para onde o cursor estiver
    function moveElemento(card) {
        card = card || window.event;
        card.preventDefault();

        // Calcula a nova posição do cursor:
        pos1 = pos3 - card.clientX;
        pos2 = pos4 - card.clientY;
        pos3 = card.clientX;
        pos4 = card.clientY;

        // Define a nova posição do elemento:
        cardDeFiltro.style.top = (cardDeFiltro.offsetTop - pos2) + "px";
        cardDeFiltro.style.left = (cardDeFiltro.offsetLeft - pos1) + "px";
    }

    // Para de mover quando o mouse for solto:
    function paraDeMoverElemento() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

/**
 * Filtrar voluntários na lista por status de acordo com o filtro selecionado
 */
document.getElementById("statusFiltrado").innerText = "Status...";

// Retorna todos os voluntários ativos
document.getElementById("filtrarAtivos").addEventListener("click", (event) => {
    const voluntarioListado = document.querySelectorAll("#corpoTabelaDeListagemDeVoluntarios tr");

    voluntarioListado.forEach((linha) => {
        const verificaVoluntarioAtivo = linha.querySelector("#statusVoluntario").textContent;
        if (verificaVoluntarioAtivo === " Ativo ") {
            linha.style.display = "table-row";
        } else {
            linha.style.display = "none";
        }
    });

    // Altera o texto do seletor por status
    document.getElementById("statusFiltrado").innerText = "Ativos";
});

// Retorna todos os voluntários em intervalo
document.getElementById("filtrarIntervalo").addEventListener("click", (event) => {
    const voluntarioListado = document.querySelectorAll("#corpoTabelaDeListagemDeVoluntarios tr");

    voluntarioListado.forEach((linha) => {
        const verificaVoluntarioIntervalo = linha.querySelector("#statusVoluntario").textContent;
        if (verificaVoluntarioIntervalo === " Intervalo ") {
            linha.style.display = "table-row";
        } else {
            linha.style.display = "none";
        }
    });

    // Altera o texto do seletor por status
    document.getElementById("statusFiltrado").innerText = "Em intervalo";
});

// Retorna todos os voluntários inativos
document.getElementById("filtrarInativos").addEventListener("click", (event) => {
    const voluntarioListado = document.querySelectorAll("#corpoTabelaDeListagemDeVoluntarios tr");

    voluntarioListado.forEach((linha) => {
        const verificaVoluntarioInativo = linha.querySelector("#statusVoluntario").textContent;
        if (verificaVoluntarioInativo === " Inativo ") {
            linha.style.display = "table-row";
        } else {
            linha.style.display = "none";
        }
    });

    // Altera o texto do seletor por status
    document.getElementById("statusFiltrado").innerText = "Inativos";
});

// Retorna todos os voluntários
document.getElementById("filtrarTodos").addEventListener("click", (event) => {
    const voluntarioListado = document.querySelectorAll("#corpoTabelaDeListagemDeVoluntarios tr");

    voluntarioListado.forEach((linha) => {
        linha.style.display = "table-row";
    });

    // Altera o texto do seletor por status
    document.getElementById("statusFiltrado").innerText = "Todos";
});