// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import Alert from 'bootstrap/js/dist/alert'

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap'

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