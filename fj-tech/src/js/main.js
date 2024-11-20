// Import our custom CSS
import '../scss/styles.scss'
import './color-modes.js'

// Informações dos voluntários
import './voluntarios/lista.mjs'
import './voluntarios/perfil.mjs'
import './voluntarios/remove.mjs'
import './voluntarios/festival/credencial.mjs'
import './voluntarios/festival/turno.mjs'
import './voluntarios/festival/resgate_hapi.mjs'

// Informações de cadastro de expedientes
import './voluntarios/festival/cadastra_checkin.mjs'
import './voluntarios/festival/cadastra_intervalo.mjs'
import './voluntarios/festival/cadastra_checkout.mjs'

// Informações dos recursos
import './recursos/cards.mjs'
import './recursos/voluntario.mjs'
import './recursos/credenciais.mjs'
import './recursos/hapis.mjs'
import './recursos/vouchers.mjs'

// Componentes do sistema
import './filtro.mjs' 

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

/**
 * Identifica a versão atual do sistema no menu da página
 */
const versaoSistema = require('./../../package.json').version; 
document.getElementById("versaoDoSistema").innerHTML = "v" + versaoSistema;

/**
 * Exibe o ano de criação do projeto no rodapé da página
 */
const anoCriacaoDoProjeto = 2024;
const anoAtual = new Date().getFullYear();

if (anoCriacaoDoProjeto != anoAtual) {
  document.getElementById("anoCriacaoProjeto").innerHTML = anoCriacaoDoProjeto + "-" + anoAtual;
}
document.getElementById("anoCriacaoProjeto").innerHTML = anoCriacaoDoProjeto;

/**
 * Habilita o uso de tooltips do boostatrap no sistema
 */
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

/**
 * Uso da API ViaCEP para preenchimento automático do endereço
 * https://viacep.com.br/
 */

/**
 * Exibe o toast de confirmação de cadastro de voluntário
 */
document.addEventListener('DOMContentLoaded', () => {
  // Captura o botão pelo ID
  const btnConfirmaRemocaoVoluntario = document.getElementById('btnRemoverVoluntario');

  // Captura o toast pelo ID
  const toastElement = document.getElementById('toastConfirmacaoRemocaoVoluntario');
  const toastBootstrap = new bootstrap.Toast(toastElement);

  // Evento de clique no botão
  btnConfirmaRemocaoVoluntario.addEventListener('click', () => { 
    toastBootstrap.show(); 
  });
});

/**
 * Altera a posição e exibição da versão do sistema para telas menores que 768px
 */
if (window.innerWidth < 768) {
  // Exibe a versão do sistema no rodapé da página
  document.getElementById("versaoDoSistema").classList.add("fixed-bottom");
  document.getElementById("versaoDoSistema").classList.add("text-end");
  document.getElementById("versaoDoSistema").classList.add("p-4");

  // Atualiza o menu lateral
  document.getElementById("menuOffcanvasNavbar").classList.add("p-4");
  document.getElementById("menuOffcanvasNavbar").classList.add("subtitle");
  document.getElementById("menuLateral").classList.add("ps-4");
}

/**
 * Imede que o usuário cole ou arraste o texto da chave de acesso no campo de texto
 */
let palavraChave = document.getElementById("palavra-chave");
palavraChave.addEventListener("paste", (event) => { event.preventDefault(); });
palavraChave.addEventListener("drop", (event) => { event.preventDefault(); });

/**
 * Bloqueia o recarregamento indesejado do sistema
 */
document.addEventListener('keydown', function (event) {
  // Bloqueia a tecla F5 e Ctrl + R 
  if ((event.key === 'F5') || (event.ctrlKey && event.key === 'r')) {
    event.preventDefault();
    //alert('Recarregar a página está bloqueado!');
  }

  // Bloqueia a tecla Enter
  if (event.key === 'Enter') {
    event.preventDefault(); 
    //alert('O recarregamento e envio com Enter está bloqueado!');
  }
});