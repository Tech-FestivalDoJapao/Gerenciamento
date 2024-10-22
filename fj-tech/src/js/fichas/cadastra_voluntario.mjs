// Initializa a integração com o Firebase
import { db } from "../firebaseConfig.mjs";
import { collection, doc, addDoc, setDoc, Timestamp } from "firebase/firestore";

const edicaoFestival = "2024";

// Referência à coleção de voluntários
const voluntarioRef = collection(db, "voluntario");

// Obtém as informações do voluntário
// Dados pessoais
let nomeCompleto = document.getElementById("nomeCompletoDoVoluntario");
let cpfVoluntario = document.getElementById("cpfDoVoluntario");
let emailVoluntario = document.getElementById("emailDoVoluntario");
let telefoneVoluntario = document.getElementById("telefoneDoVoluntario");
let sexoVoluntario = document.getElementById("sexoMasculino");
let faixaEtaria = document.getElementById("faixaEtariaDoVoluntario");
// Endereço
let cepVoluntario = document.getElementById("cepDoVoluntario");
let logradouroVoluntario = document.getElementById("enderecoDoVoluntario");
let bairroVoluntario = document.getElementById("bairroDoVoluntario");
let cidadeVoluntario = document.getElementById("cidadeDoVoluntario");
let estadoVoluntario = document.getElementById("estadoDoVoluntario");
// Contato de Emergência
let nomeContatoEmergencia = document.getElementById("nomeContatoEmergenciaDoVoluntario");
let telefoneContatoEmergencia = document.getElementById("telefoneContatoEmergenciaDoVoluntario");
// Descendência Japonesa
let descendenciaJaponesa = document.getElementById("descendenteSim");
let ascendenciaVoluntario = document.getElementById("ascendenciaDoVoluntarioDescendente");
// Escolaridade
let escolaridadeVoluntario = document.getElementById("escolaridadeDoVoluntario");
let voluntarioEstudante = document.getElementById("estudaSim");
let idiomaIngles = document.getElementById("idiomaVoluntarioIngles");
let idiomaJapones = document.getElementById("idiomaVoluntarioJapones");
let idiomaEspanhol = document.getElementById("idiomaVoluntarioEspanhol");
let libras = document.getElementById("conhecimentoLibrasSim");
// Profissão
let voluntarioTrabalhador = document.getElementById("trabalhaSim");

// Espera todo o conteúdo do site ser carregado
document.addEventListener('DOMContentLoaded', function () {
  // Obtém o botão de envio do formulário
  document.getElementById("enviaFichaDeInscricao").addEventListener("click", async (event) => {
    event.preventDefault();

    // Associa os valores dos campos do formulário às variáveis
    sexoVoluntario = sexoVoluntario.classList.contains("bg-danger") === true ? "Masculino" : "Feminino"
    descendenciaJaponesa = descendenciaJaponesa.classList.contains("bg-danger") === true ? true : false;
    voluntarioEstudante = voluntarioEstudante.classList.contains("bg-danger") === true ? true : false;
    idiomaIngles = idiomaIngles.classList.contains("bg-danger") === true ? true : false;
    idiomaJapones = idiomaJapones.classList.contains("bg-danger") === true ? true : false;
    idiomaEspanhol = idiomaEspanhol.classList.contains("bg-danger") === true ? true : false;
    libras = libras.classList.contains("bg-danger") === true ? true : false;
    voluntarioTrabalhador = voluntarioTrabalhador.classList.contains("bg-danger") === true ? true : false;

    await addDoc(voluntarioRef, {
      cpf_voluntario: cpfVoluntario.value,
      nome_completo_voluntario: nomeCompleto.value,
      treinamento_primeiros_socorros: false,

      dados_pessoais: {
        sexo_voluntario: sexoVoluntario,
        faixa_etaria: faixaEtaria.value,
        descendencia: {
          possui_descendencia_japonesa: descendenciaJaponesa,
          ascendencia_voluntario: ascendenciaVoluntario.value,
          origem_voluntario: {
            conhece_origem_familia: null,
            provincia_origem_familia: null,
          },
        },
        informacao_medica: {
          comprovante_vacinacao: null,
          condicao_ou_necessidade_especial: null,
          condicao_saude_voluntario: null,
        },
      },

      contato: {
        email_voluntario: emailVoluntario.value,
        celular_voluntario: telefoneVoluntario.value,
        emergencia: {
          nome_contato_emergencia: nomeContatoEmergencia.value,
          telefone_contato_emergencia: telefoneContatoEmergencia.value,
        },
      },

      endereco: {
        cep: cepVoluntario.value,
        logradouro: logradouroVoluntario.value,
        bairro: bairroVoluntario.value,
        cidade: cidadeVoluntario.value,
        estado: estadoVoluntario.value
      },

      carreira: {
        escolaridade: {
          estudante: voluntarioEstudante,
          nivel_escolaridade: escolaridadeVoluntario.value,
          formacao_academica: null,
          conhecimento_linguas: {
            idioma_ingles: idiomaIngles,
            idioma_japones: idiomaJapones,
            idioma_espanhol: idiomaEspanhol,
            linguagem_de_sinais_brasileira: libras,
          },
        },

        profissao: {
          trabalha_atualmente: voluntarioTrabalhador,
          profissao_voluntario: null,
          area_atuacao_voluntario: null,
          experiencia_voluntariado: {
            atua_como_voluntario: null,
            nome_entidade_voluntariado: null,
            descricao_experiencia: null,
          }
        }
      }
    })
      .then((voluntarioRef) => {
        console.log(voluntarioRef.id);

        const festivalRef = doc(collection(voluntarioRef, "festival"), edicaoFestival);
        setDoc(festivalRef, {
          data_inscricao: Timestamp.fromDate(new Date()),
          hora_resgate_hapi: null,

          codigo_credencial_voluntario: null,
          tamanho_hapi_voluntario: null,
          lider_de_equipe_festival: false,

          // Informações adicionais do voluntariado
          voluntariado: {
            requer_certificado_participacao: true,      // Habilitado por padrão
            motivacao_voluntario: null,
            area_interesse_voluntario: null
          },

          // Disponibilidade do voluntário para trabalhar na edição atual do Festival do Japão
          disponibilidade: {
            disponibilidade_geral: null,
            disponibilidade_sexta: null,
            disponibilidade_sabado: null,
            disponibilidade_domingo: null,
          },

          // Horários de trabalho do voluntário em cada dia do Festival do Japão
          expediente: {
            horarios_sexta: {
              check_in: null,
              check_out: null,
              intervalo: {
                intervalo_1: {
                  inicio_intervalo: null,
                  termino_intervalo: null,
                  resgate_voucher: null,
                  devolucao_hapi: null
                },
                intervalo_2: {
                  inicio_intervalo: null,
                  termino_intervalo: null,
                  resgate_voucher: null,
                  devolucao_hapi: null
                }
              }
            },
            horarios_sabado: {
              check_in: null,
              check_out: null,
              intervalo: {}
            },
            horarios_domingo: {
              check_in: null,
              check_out: null,
              intervalo: {}
            }
          }
        })
          .then(() => {
            console.log(`Os dados do voluntário referentes à edição de ${edicaoFestival} do Festival do Japão foram cadastrados com sucesso!`);
            limpaFichaDeCadastroDeVoluntario();
          })
          .catch((erro) => {
            console.error(`Erro ao cadastrar dados de festival referentes ao voluntário ${voluntarioRef.id}: \n`, erro);
          });
      })
      .catch((erro) => {
        console.error("Ocorreu um erro ao cadastrar voluntário. Tente novamente \n", erro);
      });
  });
});

// TODO: Implementar a validação dos campos do formulário

/**
 * Prepara uma nova ficha de cadastro de voluntários limpando os campos após a submissão do form 
 */
function limpaFichaDeCadastroDeVoluntario() {
  document.querySelectorAll(".bg-danger").forEach(element => {
    element.classList.remove("bg-danger");
  });

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.checked = false;
  });

  const selects = document.querySelectorAll("select");
  selects.forEach(select => {
    select.selectedIndex = 0;
  });

  // Dados Pessoais
  nomeCompleto.value = "";
  cpfVoluntario.value = "";
  emailVoluntario.value = "";
  telefoneVoluntario.value = "";
  
  // Endereço
  cepVoluntario.value = "";
  logradouroVoluntario.value = "";
  bairroVoluntario.value = "";
  cidadeVoluntario.value = "";
  estadoVoluntario.value = "";

  // Contato de Emergência
  nomeContatoEmergencia.value = "";
  telefoneContatoEmergencia.value = "";
}

/**
 * TODO: Atualizar a lista de voluntários cadastrados na edição atual do Festival do Japão
 */