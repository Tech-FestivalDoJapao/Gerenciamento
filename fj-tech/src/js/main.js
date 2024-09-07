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
 * TODO
 * Validação do modal para desbloquear a área administrativa do sistema com o uso de uma palavra-chave
 */

/**
 * Uso da API ViaCEP para preenchimento automático do endereço
 * https://viacep.com.br/
 */

/**
 * TODO: Habilitar o uso de toast para exibir mensagens de erro e sucesso
 */

// Move a legenda versaoDoSistema para o rodapé da página em telas menores que 768px
if (window.innerWidth < 768) {
  document.getElementById("versaoDoSistema").classList.add("fixed-bottom");
  document.getElementById("versaoDoSistema").classList.add("text-end");
  document.getElementById("versaoDoSistema").classList.add("p-4");

  document.getElementById("menuOffcanvasNavbar").classList.add("p-4");
  document.getElementById("menuOffcanvasNavbar").classList.add("subtitle");
  document.getElementById("menuLateral").classList.add("ps-4");
}