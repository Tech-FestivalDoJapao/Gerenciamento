// Initializa a integração com o Firebase
import { db } from "../firebaseConfig.mjs";
import { getFirestore, collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";

/**
 * TODO: AValia se o formulário de cadastro de voluntário foi preenchido corretamente
 */
const form = document.getElementById("enviaFichaDeInscricao");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nomeVoluntario = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    
    if (nomeVoluntario && email && telefone) {
        // All required fields are filled in, proceed with adding the volunteer
        addVolunteer(nome, email, telefone);
    } else {
        // Display an error message indicating that all required fields must be filled in
        alert("Please fill in all required fields.");
    }
});

/**
 * Adds a new volunteer to the database
 */
function addVolunteer(nome, email, telefone) {
    const voluntarioCollection = collection(getFirestore(db), "voluntario");
    const volunteerData = {
        nome,
        email,
        telefone,
        createdAt: serverTimestamp()
    };
    
    addDoc(voluntarioCollection, volunteerData)
        .then(() => {
            // Volunteer added successfully, update the volunteer list if needed
            updateVolunteerList();
        })
        .catch((error) => {
            // Display an error message if the volunteer couldn't be added
            console.error("Error adding volunteer: ", error);
        });
}

/**
 * Updates the volunteer list after adding a new volunteer
 */
function updateVolunteerList() {
    // TODO: Implement the logic to update the volunteer list
}