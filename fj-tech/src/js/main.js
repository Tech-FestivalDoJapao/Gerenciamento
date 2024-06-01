// Import our custom CSS
import '../scss/styles.scss'
import './color-modes.js'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import Alert from 'bootstrap/js/dist/alert'

const alertList = document.querySelectorAll('.alert')
const alerts = [...alertList].map(element => new bootstrap.Alert(element))

// Import icons
import '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-free'

/**
 * TODO
 * Validação do modal para desbloquear a área administrativa do sistema com o uso de uma palavra-chave
 */
const validaAcessoAdministrativo = document.getElementById('#validaAcessoAdministrativo')
if (validaAcessoAdministrativo.querySelector('.was-validated')) {
  // Valida valor informado e habilita o botão de acesso
}


/**
 * Uso da API ViaCEP para preenchimento automático do endereço
 * https://viacep.com.br/
 */