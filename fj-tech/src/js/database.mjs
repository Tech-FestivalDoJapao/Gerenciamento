import { firebaseConfig } from "./firebaseConfig.mjs";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Add a new document with a generated id.
import { collection, query, where, getDocs } from "firebase/firestore";

// Querys de interação com o banco de dados
const q = query(collection(db, "voluntario"), where("nome_completo_voluntario", "!=", null));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data().nome_completo_voluntario);

  document.getElementById("corpoTabelaDeListagemDeVoluntarios").innerHTML +=
    `<tr>
      <th scope="row">
          <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="selecionaVoluntario" />
          </div>
      </th>
      <td>
          <div class="d-flex align-items-center">
              <div class="ms">
                  <p class="fw-semibold mb-0"> ${doc.data().nome_completo_voluntario} </p>
                  <p class="text-muted mb-0"> ${doc.data().contato_voluntario.email_voluntario} </p>
              </div>
          </div>
      </td>
      <td>
          <p class="fw-normal mb-1"> ${doc.data().contato_voluntario.celular_voluntario} </p>
      </td>
      <td>
          <span class="badge rounded-pill text-bg-success"> Ativo </span>
          <span class="badge rounded-pill text-bg-warning"> Intervalo </span>
          <span class="badge rounded-pill text-bg-danger"> Inativo </span>
      </td>
      <td>
          <p>-</p>
      </td>
      <td>
          <p>-</p>
      </td>
      <td>
          <div class="btn-group btn-group-sm gap-1" role="group" aria-label="Small button group px-2">
              <!-- Editar dados do voluntário no festival -->
              <button type="button" class="btn btn-outline-danger" data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path
                          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
              </button>

              <!-- Acessar perfil cadastral do voluntário -->
              <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                  data-bs-target="#perfilVoluntarioModal" id="AcessarPerfilVoluntario" name="${doc.data().cpf_voluntario}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-person-fill" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
              </button>

              <!-- Excluir voluntário da lista do festival -->
              <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path
                          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
              </button>
          </div>
      </td>
  </tr>`;
});  