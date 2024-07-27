// Import our custom CSS
import '../scss/styles.scss'
import './color-modes.js'

// Informações dos voluntários
import './voluntarios/lista.mjs'
import './voluntarios/perfil.mjs'
import './voluntarios/remove.mjs'
import './voluntarios/festival/credencial.mjs'
import './voluntarios/festival/turno.mjs'
import './voluntarios/festival/tamanho_hapi.mjs'

// Informações dos recursos
import './recursos/cards.mjs'
import './recursos/voluntario.mjs'
import './recursos/credenciais.mjs'

// Componentes do sistema
import './filtro.mjs' 

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

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
 * Identifica o dia atual do evento
 */
const dataAtual = new Date();
document.getElementById("diaAtualEvento").innerHTML = dataAtual.getDate() + "/" + dataAtual.getMonth().toString().padStart(2, "0");


/**
 * TODO
 * Validação do modal para desbloquear a área administrativa do sistema com o uso de uma palavra-chave
 */
/*

/**
 * Uso da API ViaCEP para preenchimento automático do endereço
 * https://viacep.com.br/
 */

/**
 * TODO: Habilitar o uso de toast para exibir mensagens de erro e sucesso
 */