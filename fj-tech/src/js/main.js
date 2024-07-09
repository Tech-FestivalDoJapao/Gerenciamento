// Import our custom CSS
import '../scss/styles.scss'
import './color-modes.js'

// Informações dos voluntários
import './voluntarios/lista.mjs'
import './voluntarios/perfil.mjs'
import './voluntarios/remove.mjs'

// Informações dos recursos
import './recursos/cards.mjs'

//import './cadastra_voluntario.mjs'
//import './exibe_recursos_voluntario.mjs'
//import './cadastra_recursos_voluntario.mjs'

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
 * TODO
 * Validação do modal para desbloquear a área administrativa do sistema com o uso de uma palavra-chave
 */
/*

/**
 * Uso da API ViaCEP para preenchimento automático do endereço
 * https://viacep.com.br/
 */