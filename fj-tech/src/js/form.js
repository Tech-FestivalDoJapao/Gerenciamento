// Import our custom CSS
import '../scss/styles.scss'
import './color-modes.js'

// Import forms de cadastro 
import './fichas/cadastra_voluntario.mjs'
//import './fichas/cadastro_disponibilidade.mjs'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

/**
 * Personalização dos inputs do formulário
 */
document.querySelectorAll("input").forEach(input => {
    input.classList.add("border-0", "border-bottom", "border-danger", "border-opacity-50");
    input.addEventListener("focus", () => {
        input.classList.add("border-opacity-75");
    });

    if (input.type === "checkbox" || input.type === "radio") {
        input.classList.remove("border-0");
        input.classList.add("border", "border-opacity-75");

        input.addEventListener("focus", () => {
            if (input.type === "checkbox") {
                input.addEventListener("change", () => {
                    if (input.checked) {
                        input.classList.add("bg-danger");
                    } else {
                        input.classList.remove("bg-danger");
                    }
                });
            }

            if (input.type === "radio") {
                input.addEventListener("change", () => {
                    document.querySelectorAll(`input[name="${input.name}"]`).forEach(radio => {
                        if (radio.checked) {
                            radio.classList.add("bg-danger");
                        } else {
                            radio.classList.remove("bg-danger");
                        }
                    });
                });
            }
        });
    }
});

/**
 * Personalização dos selects do formulário
 */
document.querySelectorAll("select").forEach(select => {
    select.classList.add("border-0", "border-bottom", "border-danger", "border-opacity-50");
});

/**
 * Habilita o uso de tooltips do boostatrap no sistema
 */
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

/**
 * Exibe o toast de confirmação de cadastro de voluntário
 */
document.addEventListener('DOMContentLoaded', () => {
    // Captura o botão pelo ID
    const button = document.getElementById('enviaFichaDeInscricao');

    // Captura o toast pelo ID
    const toastElement = document.getElementById('toastConfirmacaoCadastroVoluntario');
    const toastBootstrap = new bootstrap.Toast(toastElement);

    // Evento de clique no botão
    button.addEventListener('click', () => {
        // Opcional: definir o nome do voluntário
        const nomeVoluntario = document.getElementById('nomeCompletoDoVoluntario');
        const sexoVoluntario = document.getElementById('sexoMasculino').checked ? "Masculino" : "Feminino";

        if (sexoVoluntario === "Masculino") {
            document.getElementById('txtToastVoluntario').innerText = `Voluntário ${nomeVoluntario.value} cadastrado com sucesso!`;
        } else {
            document.getElementById('txtToastVoluntario').innerText = `Voluntária ${nomeVoluntario.value} cadastrada com sucesso!`;
        }

        // Exibir o toast
        toastBootstrap.show();
    });
});

/**
 * Exibição personalizada dos campos de descendencia japonesa 
 */
var descendencia = document.getElementsByName("possuiDescendenciaJaponesa");
var descendenciaJaponesa = document.getElementById("descendenteSim");
var divAscendencia = document.getElementById("VoluntarioDescendente");

descendencia.forEach(descendencia => {
    descendencia.getAttribute("id") === "descendenteSim" 
        ? descendenciaJaponesa.checked = true 
        : descendenciaJaponesa.checked = false;

    descendencia.addEventListener("change", () => {
        if (descendenciaJaponesa.checked) {
            divAscendencia.removeAttribute("hidden");
        } else {
            divAscendencia.setAttribute("hidden", true);
        }
    });
});