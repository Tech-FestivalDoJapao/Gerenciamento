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
import { collection, addDoc } from "firebase/firestore";
/*
try {
  const docRef = await addDoc(collection(db, "voluntario"), {
    nome_completo_voluntario: "Nome Completo do Voluntário",    
    cpf_voluntario: "000.000.000-00",
    contato_voluntario: {
      email_voluntario: "voluntario@email.com",
      telefone_voluntario: "+55 (11) 9999-9999", 
      celular_voluntario: "+55 (11) 99999-9999"},
      contato_emergencia_voluntario: {
        nome_contato_emergencia: "Nome do Contato de Emergência",
        telefone_contato_emergencia: "+55 (11) 99999-9999",
      },  
    sexo_voluntario: "Masculino",    
    faixa_etaria_voluntario: [
      "-16", "16-20", "21-30", "31-40", 
      "41-50", "51-60", "61+"],
    endereco_voluntario: {
      cep: "00000-000",
      logradouro: "Rua do Voluntário, nº 123",
      bairro: "Bairro do Voluntário",
      cidade: "Cidade do Voluntário",
      estado: "SP",
    },      
    descendencia_voluntario: {
      descendente_japones: true,
      ascendencia_voluntario: [
        "Issei", "Nissei", "Sansei", "Yonsei", 
        "Gosei", "Rokusei", "Shinissei"
      ],
      origem_voluntario: {
        conhece_origem_antepassados: true,
        provincia_origem_antepassados: "Província(s) de Origem dos Antepassados do Voluntário",
      },      
    },    
    escolaridade_voluntario: {
      nivel_escolaridade_voluntario: [
        "Pós-graduação completo",
        "Superior completo",
        "Superior incompleto", 
        "Ensino Médio completo",
        "Ensino Médio incompleto",
        "Fundamental II completo",
        "Fundamental II incompleto",
        "Fundamental I completo",
        "Fundamental I incompleto",
      ],
      conhecimento_voluntario: {
        idioma_japones: true,
        idioma_ingles: true,
        idioma_espanhol: false,      
        linguagem_libras: false,  
      },
      formacao_voluntario: "Curso do Voluntário",
      estuda_atualmente: true,
    },
    treinamento_primeiros_socorros: true,
    carreira_voluntario: {
      trabalha_atualmente: true,
      profissao_voluntario: "Profissão do Voluntário",
      area_atuacao_voluntario: "Área de Atuação do Voluntário",
    },
    saude_voluntario: {
      comprovante_vacinacao_voluntario: true,
      condicao_necessidade_especial: false,
      condicao_saude_voluntario: "Condição ou Necessidade de Saúde do Voluntário",
    },
    tamanho_hapi_voluntario: [
      "P", "M", "G", "GG", "XG"
    ],
    voluntariado: {
      experiencia_voluntariado: {
        atua_como_voluntario: true,
        nome_entidade_voluntariado: "Nome da Entidade de Voluntariado",    
        experiencia_como_voluntario: "Descrição das experiências anteriores de voluntariado e trabalho do Voluntário",  
      },
      voluntariado_festival_do_japao: {
        participacao_anterior_voluntario_festival_do_japao: true,
        area_atuacao_voluntario_festival_do_japao: "Áreas de Atuação do Voluntário em edições anteriores do Festival do Japão",
        area_interesse_voluntario_festival_do_japao: [
          "Organização Geral",
          "Gastronomia (kenjinkais e entidades)",
          "Qualquer área",
        ],
        lider_de_equipe_festival_do_japao: true,   
        requer_certificado_participacao: true,     
      },
      disponibilidade_voluntario: [
        "Qualquer dia e horário, durante semana e finais de semana",
        "Dias antes do evento, aos finais de semana",
        "Montagem e no período do evento",
        "Apenas no período do evento",
        "Apenas em um dia do evento",
        "Apenas no final de semana do evento",
      ],
      disponibilidade_voluntario_festival: {        
        disponibilidade_voluntario_sexta: [
          "Indisponível", "Manhã", "Tarde", "Noite", "Integral"
        ],
        disponibilidade_voluntario_sabado: [
          "Indisponível", "Manhã", "Tarde", "Noite", "Integral"
        ],
        disponibilidade_voluntario_domingo: [
          "Indisponível", "Manhã", "Tarde", "Noite", "Integral"
        ],
      },    
      motivo_voluntariado: "Motivo do Voluntário para o Voluntariado",
      data_inscricao: "DD/MM/AAAA",
    },    
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
*/

import { query, where, getDocs } from "firebase/firestore";

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