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

const q = query(collection(db, "voluntario"), where("nome_completo_voluntario", "!=", null));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data().nome_completo_voluntario);
  document.getElementById("nomeCompletoVoluntario").innerText += `${doc.data().nome_completo_voluntario}`;
});