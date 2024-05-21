// Import our custom CSS
import '../scss/styles.scss';

// Import only the Bootstrap components we need
import { Card, Modal, Popover, Toast } from 'bootstrap';
import { PerfilVoluntario } from '../pages/perfil-voluntario'

// Create an example popover
document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })

document.getElementById("#cardVoluntarios").onclick(
  document.getElementById("#voluntario").hidden(false);
  document.getElementById("#voluntario").innerHTML('pages/voluntarios;js');
)