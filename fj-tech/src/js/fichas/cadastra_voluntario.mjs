// Initializa a integração com o Firebase
import { db } from "../firebaseConfig.mjs";
import { collection, doc, addDoc, setDoc, Timestamp } from "firebase/firestore";

const edicaoFestival = "2024";
const voluntarioRef = collection(db, "voluntario");

await addDoc(voluntarioRef, {
  cpf_voluntario: "000.000.000-00",
  nome_completo_voluntario: "Nome Completo",
  treinamento_primeiros_socorros: true,

  dados_pessoais: {
    sexo_voluntario: "Masculino",
    faixa_etaria: [
      "-16", "16-20", "21-30", "31-40",
      "41-50", "51-60", "61+"],
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
    email_voluntario: "voluntario@email.com",
    celular_voluntario: "+55 (11) 99999-9999",
    emergencia: {
      nome_contato_emergencia: "Nome do Contato de Emergência",
      telefone_contato_emergencia: "+55 (11) 99999-9999",
    },
  },

  endereco: {
    cep: "00000-000",
    logradouro: "Rua do Voluntário, nº 123",
    bairro: "Bairro do Voluntário",
    cidade: "Cidade do Voluntário",
    estado: "SP"
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
        idioma_ingles: true,
        idioma_japones: true,
        idioma_espanhol: false,
        linguagem_de_sinais_brasileira: false,
      },
    },

    profissao: {
      trabalha_atualmente: true,
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
    //console.log(voluntarioRef.id);

    const festivalRef = doc(collection(voluntarioRef, "festival"), edicaoFestival);
    setDoc(festivalRef, {
      data_inscricao: Timestamp.fromDate(new Date()),

      codigo_credencial_voluntario: "000000",
      tamanho_hapi_voluntario: "M",
      lider_de_equipe_festival: false,

      // Informações adicionais do voluntariado
      voluntariado: {
        requer_certificado_participacao: true,
        motivacao_voluntario: "Motivo do Voluntário para o Voluntariado",
        area_interesse_voluntario: [
          "Organização Geral",
          "Gastronomia (kenjinkais e entidades)",
          "Qualquer área",
        ]
      },

      // Disponibilidade do voluntário para trabalhar na edição atual do Festival do Japão
      disponibilidade: {
        disponibilidade_geral: [
          "Qualquer dia e horário, durante semana e finais de semana",
          "Dias antes do evento, aos finais de semana",
          "Montagem e no período do evento",
          "Apenas no período do evento",
          "Apenas em um dia do evento",
          "Apenas no final de semana do evento",
        ],
        disponibilidade_sexta: [
          "Indisponível", "Manhã", "Tarde", "Noite", "Integral"
        ],
        disponibilidade_sabado: [
          "Indisponível", "Manhã", "Tarde", "Noite", "Integral"
        ],
        disponibilidade_domingo: [
          "Indisponível", "Manhã", "Tarde", "Noite", "Integral"
        ],
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
              resgate_voucher: true,
              devolucao_hapi: true
            },
            intervalo_2: {
              inicio_intervalo: null,
              termino_intervalo: null,
              resgate_voucher: false,
              devolucao_hapi: true
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
      })
      .catch((erro) => {
        console.error(`Erro ao cadastrar dados de festival referentes ao voluntário ${voluntarioRef.id}: \n`, erro);
      });
  })
  .catch((erro) => {
    console.error("Ocorreu um erro ao cadastrar voluntário. Tente novamente \n", erro);
  });