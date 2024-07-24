// Initializa a integração com o Firebase
import { db } from "./../firebaseConfig.mjs";
import { collection, doc, getDocs, query } from "firebase/firestore";

/**
 * Identifica a quantidade de voluntários cadastrados para a edição atual do festival
 */
const queryRecursos = query(collection(db, "voluntario"));
const querySnapshot = await getDocs(queryRecursos);

const voluntariosFestival =  querySnapshot.size; 

document.getElementById("totalVoluntariosFestival").innerHTML = voluntariosFestival;

/**
 * Identifica a quantidade de voluntários presentes no festival identificados com o status "Ativo"
 */
let voluntariosAtivos = 0;
querySnapshot.forEach((doc) => {
    // Verifica se o voluntáio está presente no festival e não está em intervalo
    if (doc.data().voluntariado.horarios.horario_checkin != null 
        && doc.data().voluntariado.horarios.horario_intervalo.inicio_intervalo == null 
        && doc.data().voluntariado.horarios.horario_intervalo.fim_intervalo == null 
        && doc.data().voluntariado.horarios.horario_checkout == null) {
        voluntariosAtivos++;
    }

    // Verifica se o voluntário está presente no festival e já teve algum intervalo
    if (doc.data().voluntariado.horarios.horario_checkin != null 
        && doc.data().voluntariado.horarios.horario_intervalo.inicio_intervalo != null 
        && doc.data().voluntariado.horarios.horario_intervalo.fim_intervalo != null
        && doc.data().voluntariado.horarios.horario_checkout == null) {
        voluntariosAtivos++;
    }
});

document.getElementById("qtdeVoluntariosPresentes").innerHTML = voluntariosAtivos;

// Calcula a porcentagem de voluntários presentes no festival para exibir no progress bar
const porcentagemVoluntariosPresentes = ((voluntariosAtivos / voluntariosFestival) * 100);
// Atualiza o progress bar de voluntários presentes
document.getElementById("volPresente").style.width = porcentagemVoluntariosPresentes + "%";
document.getElementById("volPresente").ariaValueNow = voluntariosAtivos;
document.getElementById("volPresente").children[0].innerHTML = porcentagemVoluntariosPresentes.toFixed(2) + "%";

/**
 * Identifica a quantidade de voluntários em intervalo no festival identificados com o status "Intervalo"
 */
let voluntariosIntervalo = 0;
querySnapshot.forEach((doc) => {
    if (doc.data().voluntariado.horarios.horario_checkin != null 
        && doc.data().voluntariado.horarios.horario_intervalo.inicio_intervalo != null 
        && doc.data().voluntariado.horarios.horario_intervalo.fim_intervalo == null
        && doc.data().voluntariado.horarios.horario_checkout == null) {
        voluntariosIntervalo++;
    }
});

document.getElementById("qtdeVoluntariosIntervalo").innerHTML = voluntariosIntervalo;

// Calcula a porcentagem de voluntários em intervalo no festival para exibir no progress bar
const porcentagemVoluntariosIntervalo = ((voluntariosIntervalo / voluntariosFestival) * 100);
// Atualiza o progress bar de voluntários em intervalo
document.getElementById("volIntervalo").style.width = porcentagemVoluntariosIntervalo + "%";
document.getElementById("volIntervalo").ariaValueNow = voluntariosIntervalo;
document.getElementById("volIntervalo").children[0].innerHTML = porcentagemVoluntariosIntervalo.toFixed(2) + "%";

/**
 * Identifica a quantidade de voluntários ausentes no festival identificados com o status "Inativo"
 */
let voluntariosAusentes = 0;
querySnapshot.forEach((doc) => {
    if (doc.data().voluntariado.horarios.horario_checkin == null 
        || doc.data().voluntariado.horarios.horario_checkout != null) {
        voluntariosAusentes++;
    }
});

document.getElementById("qtdeVoluntariosAusentes").innerHTML = voluntariosAusentes;

// Calcula a porcentagem de voluntários ausentes no festival para exibir no progress bar
const porcentagemVoluntariosAusentes = ((voluntariosAusentes / voluntariosFestival) * 100);
// Atualiza o progress bar de voluntários ausentes
document.getElementById("volAusente").style.width = porcentagemVoluntariosAusentes + "%";
document.getElementById("volAusente").ariaValueNow = voluntariosAusentes;
document.getElementById("volAusente").children[0].innerHTML = porcentagemVoluntariosAusentes.toFixed(2) + "%";