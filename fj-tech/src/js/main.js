// Import our custom CSS
import '../scss/styles.scss'
import './color-modes.js'

// Adiciona as variáveis de ambiente
require('dotenv').config()

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
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.FIREBASE_REALTIME_DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);