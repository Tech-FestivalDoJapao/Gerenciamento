// Import our custom CSS
import '../scss/styles.scss'
import './color-modes.js'

// Informações dos voluntários
import './voluntarios/lista.mjs'
import './voluntarios/perfil.mjs'
import './voluntarios/remove.mjs'

//import './database.mjs'
//import './cadastra_voluntario.mjs'
//import './remover_voluntario.mjs'
//import './exibe_recursos_voluntario.mjs'
//import './cadastra_recursos_voluntario.mjs'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

/**
 * TODO
 * Validação do modal para desbloquear a área administrativa do sistema com o uso de uma palavra-chave
 */
/*
const validaAcessoAdministrativo = document.getElementById('#validaAcessoAdministrativo')
if (validaAcessoAdministrativo.querySelector('.was-validated')) {
  // Valida valor informado e habilita o botão de acesso
}
  */

/**
 * Uso da API ViaCEP para preenchimento automático do endereço
 * https://viacep.com.br/
 */