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
let faixaEtaria = document.getElementsByName('input[name="faixaEtariaDoVoluntario"]:checked');

// Endereço
let cepVoluntario = document.getElementById("cepDoVoluntario");
let logradouroVoluntario = document.getElementById("enderecoDoVoluntario");
let bairroVoluntario = document.getElementById("bairroDoVoluntario");
let cidadeVoluntario = document.getElementById("cidadeDoVoluntario");
let estadoVoluntario = document.getElementById("estadoDoVoluntario");
// Contato de Emergência
let nomeContatoEmergencia = document.getElementById("nomeContatoEmergenciaDoVoluntario");
let telefoneContatoEmergencia = document.getElementById("telefoneContatoEmergenciaDoVoluntario");

// Espera todo o conteúdo do site ser carregado
document.addEventListener('DOMContentLoaded', function () {
  // Obtém o botão de envio do formulário
  document.getElementById("enviaFichaDeInscricao").addEventListener("click", async (event) => {
    event.preventDefault();

    sexoVoluntario = sexoVoluntario.classList.contains("bg-danger") === true ? "Masculino" : "Feminino"

    await addDoc(voluntarioRef, {
      cpf_voluntario: cpfVoluntario.value,
      nome_completo_voluntario: nomeCompleto.value,
      treinamento_primeiros_socorros: false,

      dados_pessoais: {
        sexo_voluntario: sexoVoluntario,
        faixa_etaria: null,
        descendencia: {
          possui_descendencia_japonesa: true,
          ascendencia_voluntario: [
            "Issei", "Nissei", "Sansei", "Yonsei",
            "Gosei", "Rokusei", "Shinissei"
          ],
          origem_voluntario: {
            conhece_origem_familia: true,
            provincia_origem_familia: "Província(s) de Origem dos Antepassados do Voluntário",
          },
        },
        informacao_medica: {
          comprovante_vacinacao: true,
          condicao_ou_necessidade_especial: false,
          condicao_saude_voluntario: "Condição ou Necessidade de Saúde do Voluntário",
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
          estudante: true,
          nivel_escolaridade: [
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
          formacao_academica: "Curso do Voluntário",
          conhecimento_linguas: {
            idioma_ingles: false,
            idioma_japones: false,
            idioma_espanhol: false,
            linguagem_de_sinais_brasileira: false,
          },
        },

        profissao: {
          trabalha_atualmente: false,
          profissao_voluntario: "Profissão do Voluntário",
          area_atuacao_voluntario: "Área de Atuação do Voluntário",
          experiencia_voluntariado: {
            atua_como_voluntario: true,
            nome_entidade_voluntariado: "Nome da Entidade de Voluntariado",
            descricao_experiencia: "Descrição das experiências anteriores de voluntariado e trabalho do Voluntário",
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

            exibeToastConfirmacaoCadastroVoluntario(nomeCompleto);
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
  // Dados Pessoais
  nomeCompleto.value = "";
  cpfVoluntario.value = "";
  emailVoluntario.value = "";
  telefoneVoluntario.value = "";
  faixaEtaria

  // Endereço
  cepVoluntario.value = "";
  logradouroVoluntario.value = "";
  bairroVoluntario.value = "";
  cidadeVoluntario.value = "";
  estadoVoluntario.value = "";

  // Contato de Emergência
  nomeContatoEmergencia.value = "";
  telefoneContatoEmergencia.value = "";

  // TODO: Descendência Japonesa

  // TODO: Escolaridade
}

/**
 * TODO: Atualizar a lista de voluntários cadastrados na edição atual do Festival do Japão
 */