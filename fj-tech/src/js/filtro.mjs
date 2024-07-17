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