import { firebaseConfig } from "./firebaseConfig.mjs";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getFirestore, serverTimestamp, Timestamp } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export { db };

// Add a new document with a generated id.
import { collection, query, where, getDocs } from "firebase/firestore";

// Querys de interação com o banco de dados
const q = query(collection(db, "voluntario"), where("nome_completo_voluntario", "!=", null));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    /**
     * Torna as datas de check-in, check-out e intervalo legíveis
     */
    const checkIn = (doc.data().voluntariado.horarios.horario_checkin)
        ? new Date(doc.data().voluntariado.horarios.horario_checkin * 1000).toLocaleTimeString('pt-BR')
        : " - ";
    const inicioIntervalo = (doc.data().voluntariado.horarios.horario_intervalo.inicio_intervalo)
        ? new Date(doc.data().voluntariado.horarios.horario_intervalo.inicio_intervalo * 1000).toLocaleTimeString('pt-BR')
        : " - ";
    const fimIntervalo = (doc.data().voluntariado.horarios.horario_intervalo.fim_intervalo)
        ? new Date(doc.data().voluntariado.horarios.horario_intervalo.fim_intervalo * 1000).toLocaleTimeString('pt-BR')
        : " - ";
    const checkOut = (doc.data().voluntariado.horarios.horario_checkout)
        ? new Date(doc.data().voluntariado.horarios.horario_checkout * 1000).toLocaleTimeString('pt-BR')
        : " - ";

    /**
     * Verifica se o voluntário está ativo, em intervalo, inativo ou se já finalizou o expediente
     */
    const status = ((checkIn != " - ") && (checkOut == " - ") && (inicioIntervalo == " - ") && (fimIntervalo == " - "))
        ? "<span class='badge rounded-pill text-bg-success'> Ativo </span>"
        : ((checkIn != " - ") && (checkOut == " - ") && (inicioIntervalo != " - ") && (fimIntervalo == " - "))
            ? "<span class='badge rounded-pill text-bg-warning'> Intervalo </span>"
            : ((checkIn != " - ") && (checkOut == " - ") && (inicioIntervalo != " - ") && (fimIntervalo != " - "))
                ? "<span class='badge rounded-pill text-bg-success'> Ativo </span>"
                : "<span class='badge rounded-pill text-bg-danger'> Inativo </span>";

    /**
     * Insere os dados do voluntário na tabela de listagem de voluntários
     */
    document.getElementById("corpoTabelaDeListagemDeVoluntarios").innerHTML +=
        `<tr id="${doc.id}">
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
          ${status} 
      </td>
      <td>
          <p class="text-center"> ${checkIn} </p>
      </td>
      <td>
          <p class="text-center"> ${checkOut} </p>
      </td>
      <td>
          <div class="btn-group btn-group-sm gap-1" role="group" aria-label="Small button group px-2">
              <!-- Editar dados do voluntário no festival -->
              <button type="button" class="btn btn-outline-danger" id="GerenciarRecursosDoVoluntarioNoFestival" name="${doc.id}" onclick="atualizaOffcanvas(${doc.id})"
                  data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
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
                  data-bs-target="#PerfilVoluntarioModal" id="AcessarPerfilVoluntario" name="${doc.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-person-fill" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
              </button>

              <!-- Excluir voluntário da lista do festival -->
              <button type="button" class="btn btn-outline-danger" id="removerVoluntario" name="${doc.id}" 
                  data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path
                          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
              </button>
          </div>
      </td>
  </tr>`;

    /**
     * Adiciona o ID do voluntário ao botão de remoção
     */
    const identificaVoluntarioRemocao = document.getElementById("corpoTabelaDeListagemDeVoluntarios").lastElementChild.id;
    document.querySelector("#removerVoluntario").setAttribute('name', identificaVoluntarioRemocao);
    const btnRemoverVoluntario = document.querySelector("#removerVoluntario").getAttribute('name');
    
    if (btnRemoverVoluntario == doc.id) { 
        const identificaRegistroVoluntarioRemocao = document.getElementById("identificaRegistroVoluntarioRemocao");
    
        if (identificaVoluntarioRemocao != identificaRegistroVoluntarioRemocao) {            
            document.getElementById("identificaRegistroVoluntario").innerText = `${doc.id}`;
            document.getElementById("nomeVoluntarioCandidatoRemocao").innerText = `${doc.data().nome_completo_voluntario}`;
        } 

    } 
    
    //console.log(identificaVoluntarioRemocao, "\n", doc.id, "\n", btnRemoverVoluntario);    

    const acessarPerfil = document.getElementById("corpoTabelaDeListagemDeVoluntarios").querySelector("#AcessarPerfilVoluntario");    
    const corpoTabela = document.getElementById("corpoTabelaDeListagemDeVoluntarios");

    if (acessarPerfil) {
        const trElements = corpoTabela.getElementsByTagName("tr").item(doc.id);

        acessarPerfil.addEventListener("click", function() {
            document.getElementById("perfilVoluntarioModalLabel").innerText = `${doc.data().nome_completo_voluntario}`;
            document.getElementById("docVoluntarioPerfil").innerText = `Voluntário desde ${new Date(doc.data().voluntariado.data_inscricao * 1000).toLocaleString('pt-BR')}`;


            // Dados Pessoais
            document.getElementById("nomeCompletoDoVoluntario").value = doc.data().nome_completo_voluntario;
            document.getElementById("cpfDoVoluntario").value = doc.data().cpf_voluntario;
            document.getElementById("emailDoVoluntario").value = doc.data().contato_voluntario.email_voluntario;
            document.getElementById("telefoneDoVoluntario").value = doc.data().contato_voluntario.celular_voluntario;

            (doc.data().sexo_voluntario === "Masculino") 
                ? document.getElementById("sexoMasculino").checked = true 
                : document.getElementById("sexoFeminino").checked = true;

            doc.data().faixa_etaria_voluntario.forEach((faixaEtaria) => {                
                document.getElementById("faixaEtariaDoVoluntario").value += faixaEtaria;
            });

            // Contato de Emergência
            document.getElementById("nomeContatoDoVoluntario").value = doc.data().contato_emergencia_voluntario.nome_contato_emergencia;
            document.getElementById("telefoneContatoDoVoluntario").value = doc.data().contato_emergencia_voluntario.telefone_contato_emergencia;

            // Endereço
            document.getElementById("cepDoVoluntario").setAttribute("readonly", true);
            document.getElementById("cepDoVoluntario").value = doc.data().endereco_voluntario.cep;

            document.getElementById("enderecoDoVoluntario").value = doc.data().endereco_voluntario.logradouro;
            document.getElementById("bairroDoVoluntario").value = doc.data().endereco_voluntario.bairro;
            document.getElementById("cidadeDoVoluntario").value = doc.data().endereco_voluntario.cidade;
            document.getElementById("estadoDoVoluntario").value = doc.data().endereco_voluntario.estado;

            // Dados adicionais
            document.getElementById("ascendente").setAttribute("hidden", true);
            if (doc.data().descendencia_voluntario.descendente_japones === true) {
                document.getElementById("descendenteSim").checked = true;
                document.getElementById("ascendente").removeAttribute("hidden");
            } else {
                document.getElementById("descendenteNao").checked = true;                
            }

            doc.data().descendencia_voluntario.ascendencia_voluntario.forEach((ascendencia) => {
                document.getElementById("ascendenciaDoVoluntarioDescendente").value += ascendencia;
            });

            // Idiomas
            // Conhecimento em Ingl~Es
            document.getElementById("idiomaVoluntarioIngles").removeAttribute("checked", true);
            (doc.data().escolaridade_voluntario.conhecimento_voluntario.idioma_ingles === true) 
                ? document.getElementById("idiomaVoluntarioIngles").setAttribute("checked", true)
                : document.getElementById("idiomaVoluntarioIngles").removeAttribute("checked");
            // Conhecimento em Japonês
            document.getElementById("idiomaVoluntarioJapones").removeAttribute("checked", true);
            (doc.data().escolaridade_voluntario.conhecimento_voluntario.idioma_japones === true) 
                ? document.getElementById("idiomaVoluntarioJapones").setAttribute("checked", true)
                : document.getElementById("idiomaVoluntarioJapones").removeAttribute("checked");
            // Conhecimento em Espanhol
            document.getElementById("idiomaVoluntarioEspanhol").removeAttribute("checked", true);
            (doc.data().escolaridade_voluntario.conhecimento_voluntario.idioma_espanhol === true) 
                ? document.getElementById("idiomaVoluntarioEspanhol").setAttribute("checked", true)
                : document.getElementById("idiomaVoluntarioEspanhol").removeAttribute("checked");
            
            // Conhecimento em Libras
            (doc.data().escolaridade_voluntario.conhecimento_voluntario.linguagem_libras === true) 
                ? document.getElementById("conhecimentoLibrasSim").checked = true 
                : document.getElementById("conhecimentoLibrasNao").checked = true;

            // Treinamento em Primeiros Socorros
            (doc.data().escolaridade_voluntario.treinamento_primeiros_socorros === true) 
                ? document.getElementById("treinamentoSim").checked = true 
                : document.getElementById("treinamentoNao").checked = true;

            // Escolaridade
            doc.data().escolaridade_voluntario.nivel_escolaridade_voluntario.forEach((nivelEscolaridade) => {
                document.getElementById("nivelEscolaridadeVoluntario").value += nivelEscolaridade;
            });

            // Trabalho
            (doc.data().carreira_voluntario.trabalha_atualmente === true) 
                ? document.getElementById("trabalhaSim").checked = true 
                : document.getElementById("trabalhaNao").checked = true;
        });
    } else {
        alert("Erro: Botão não encontrado");
    }

    /*
    for (let i = 0; i < trElements.length; i++) {
        const trIdValue = trElements[i].id;
        console.log(trIdValue);
        const acessarPerfil = trElements[i].querySelector("#AcessarPerfilVoluntario");
        if (acessarPerfil && trIdValue === acessarPerfil.getAttribute('name')) {
            //acessarPerfil.setAttribute('data-name', trIdValue);
            const dadosPessoaisVoluntario = document.getElementById("dadosPessoaisVoluntario");
            if (dadosPessoaisVoluntario) {
                dadosPessoaisVoluntario.innerText = `${acessarPerfil.getAttribute('name')}`;
            }
        }

        console.log(acessarPerfil.getAttribute('name'));

    }
*/


/*
    if (corpoTabela) {
        const trElements = corpoTabela.getElementsByTagName("tr");
        for (let i = 0; i < trElements.length; i++) {
            const trIdValue = trElements[i].id;
            console.log(trIdValue);
            const acessarPerfil = trElements[i].querySelector("#AcessarPerfilVoluntario");
            if (acessarPerfil && trIdValue === acessarPerfil.getAttribute('name')) {
                //acessarPerfil.setAttribute('data-name', trIdValue);
                const dadosPessoaisVoluntario = document.getElementById("dadosPessoaisVoluntario");
                if (dadosPessoaisVoluntario) {
                    dadosPessoaisVoluntario.innerText = `${acessarPerfil.getAttribute('name')}`;
                }
            }

            console.log(acessarPerfil.getAttribute('name'));

        }
    }
*/

   /*
    console.log(acessarPerfil);
    acessarPerfil.addEventListener("click", function() {
        const idVoluntario = acessarPerfil.getAttribute('name');
        const nomeVoluntario = doc.data().nome_completo_voluntario;
        const perfilVoluntarioModal = document.getElementById("perfilVoluntarioModal");
        const nomeVoluntarioCandidato = perfilVoluntarioModal.querySelector("#nomeVoluntarioCandidato");
        nomeVoluntarioCandidato.innerText = nomeVoluntario;
        console.log(idVoluntario);
    });
    */
});