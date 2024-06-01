// Import our custom CSS
import '../scss/styles.scss'
import './color-modes.js'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

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

/**
 * [TODO] Configurar acesso à base de dados
 */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeWGSCxslocTAsWW6g-eNRtWSbEolJwIU",
  authDomain: "fjtech-8d0ea.firebaseapp.com",
  databaseURL: "https://fjtech-8d0ea-default-rtdb.firebaseio.com",
  projectId: "fjtech-8d0ea",
  storageBucket: "fjtech-8d0ea.appspot.com",
  messagingSenderId: "1061546904371",
  appId: "1:1061546904371:web:74fdb21d188a6a856d8c46",
  measurementId: "G-WT9DPY5ZN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);