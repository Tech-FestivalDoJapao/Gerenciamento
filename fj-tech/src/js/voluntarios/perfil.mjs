// Initializa a integração com o Firebase
import { db } from "./../firebaseConfig.mjs";
import { doc, getDoc } from "firebase/firestore";

import './lista.mjs';

/**
 * Identifica o id do voluntário cujo perfil será exibido
 */
document.getElementById("corpoTabelaDeListagemDeVoluntarios").addEventListener("click", () => {
    document.querySelectorAll("tr").forEach((tr) => {
        tr.addEventListener("click", async () => {
            const idPerfilVoluntario = tr.id;
            
            /**
             * Exibe as informações mais relevantes do voluntário na tela de perfil
             */
            const docVoluntarioRef = doc(db, "voluntario", idPerfilVoluntario);
            const perfil = await getDoc(docVoluntarioRef);
            const docFestivalRef = doc(docVoluntarioRef, 'festival', '2024');
            const festival = await getDoc(docFestivalRef);

            if (perfil.exists()) {
                // Limpa os campos do modal de perfil do voluntário se houver algum valor
                clearInputData();

                // Identifica o código de credencial e a data de inscrição do voluntário
                const codigoCredencial = festival.data().codigo_credencial_voluntario;
                const dataInscricao = new Date(festival.data().data_inscricao.toDate()).toLocaleDateString("pt-BR");
                // Exibe apenas a data de inscrição do voluntário no header do modal de perfil, caso não haja credencial alocada
                if (codigoCredencial === null) {
                    document.getElementById("docVoluntarioPerfil").innerHTML = `Voluntário desde ${dataInscricao}`;
                    
                    return;
                }              
                // Exibe o código de credencial alocado e a data de inscrição do voluntário no header do modal de perfil  
                document.getElementById("docVoluntarioPerfil").innerHTML = `ID: ${codigoCredencial} | Voluntário desde ${dataInscricao}`;

                /**
                 * Dados Pessoais 
                 */
                document.getElementById("nomeCompletoDoVoluntario").value = perfil.data().nome_completo_voluntario;
                document.getElementById("cpfDoVoluntario").value = perfil.data().cpf_voluntario;
                document.getElementById("emailDoVoluntario").value = perfil.data().contato.email_voluntario;
                document.getElementById("telefoneDoVoluntario").value = perfil.data().contato.celular_voluntario;

                (perfil.data().dados_pessoais.sexo_voluntario === "Masculino")
                    ? document.getElementById("sexoMasculino").checked = true
                    : document.getElementById("sexoFeminino").checked = true;

                perfil.data().dados_pessoais.faixa_etaria.forEach((faixaEtaria) => {
                    document.getElementById("faixaEtariaDoVoluntario").value += faixaEtaria;
                });

                /**
                 * Contato de Emergência
                 */
                document.getElementById("nomeContatoDoVoluntario").value = perfil.data().contato.emergencia.nome_contato_emergencia;
                document.getElementById("telefoneContatoDoVoluntario").value = perfil.data().contato.emergencia.telefone_contato_emergencia;

                /**
                 * Endereço do Voluntário
                 */
                document.getElementById("cepDoVoluntario").setAttribute("readonly", true);
                document.getElementById("cepDoVoluntario").value = perfil.data().endereco.cep;

                document.getElementById("enderecoDoVoluntario").value = perfil.data().endereco.logradouro;
                document.getElementById("bairroDoVoluntario").value = perfil.data().endereco.bairro;
                document.getElementById("cidadeDoVoluntario").value = perfil.data().endereco.cidade;
                document.getElementById("estadoDoVoluntario").value = perfil.data().endereco.estado;

                /**
                 * Dados Adicionais
                 */
                document.getElementById("ascendente").setAttribute("hidden", true);
                if (perfil.data().dados_pessoais.descendencia.possui_descendencia_japonesa === true) {
                    document.getElementById("descendenteSim").checked = true;
                    document.getElementById("ascendente").removeAttribute("hidden");
                } else {
                    document.getElementById("descendenteNao").checked = true;
                    document.getElementById("ascendente").setAttribute("hidden", true);
                }

                perfil.data().dados_pessoais.descendencia.ascendencia_voluntario.forEach((ascendencia) => {
                    document.getElementById("ascendenciaDoVoluntarioDescendente").value += ascendencia;
                });

                // Idiomas
                // Conhecimento em Ingl~Es
                document.getElementById("idiomaVoluntarioIngles").removeAttribute("checked", true);
                (perfil.data().carreira.escolaridade.conhecimento_linguas.idioma_ingles === true)
                    ? document.getElementById("idiomaVoluntarioIngles").checked = true
                    : document.getElementById("idiomaVoluntarioIngles").removeAttribute("checked");
                // Conhecimento em Japonês
                document.getElementById("idiomaVoluntarioJapones").removeAttribute("checked", true);
                (perfil.data().carreira.escolaridade.conhecimento_linguas.idioma_japones === true)
                    ? document.getElementById("idiomaVoluntarioJapones").checked = true
                    : document.getElementById("idiomaVoluntarioJapones").removeAttribute("checked");
                // Conhecimento em Espanhol
                document.getElementById("idiomaVoluntarioEspanhol").removeAttribute("checked", true);
                (perfil.data().carreira.escolaridade.conhecimento_linguas.idioma_espanhol === true)
                    ? document.getElementById("idiomaVoluntarioEspanhol").checked = true
                    : document.getElementById("idiomaVoluntarioEspanhol").removeAttribute("checked");

                // Conhecimento em Libras
                (perfil.data().carreira.escolaridade.conhecimento_linguas.linguagem_de_sinais_brasileira === true)
                    ? document.getElementById("conhecimentoLibrasSim").checked = true
                    : document.getElementById("conhecimentoLibrasNao").checked = true;

                // Treinamento em Primeiros Socorros
                (perfil.data().treinamento_primeiros_socorros === true)
                    ? document.getElementById("treinamentoSim").checked = true
                    : document.getElementById("treinamentoNao").checked = true;

                // Escolaridade
                perfil.data().carreira.escolaridade.nivel_escolaridade.forEach((nivelEscolaridade) => {
                    document.getElementById("nivelEscolaridadeVoluntario").value += nivelEscolaridade;
                });

                // Trabalho
                (perfil.data().carreira.profissao.trabalha_atualmente === true)
                    ? document.getElementById("trabalhaSim").checked = true
                    : document.getElementById("trabalhaNao").checked = true;
            } else {
                // perfil.data() retornará undefined
                console.log("Não foi possível encontrar o perfil deste voluntário.");
            }
        });
    });
});


// Botões de fechamento do modal de perfil do voluntário
const btnFecharPerfilHeader = document.getElementById("btnFecharPerfilHeader");
const btnFecharPerfilFooter = document.getElementById("btnFecharPerfilFooter");
/**
 * Limpa os campos de perfil do voluntário após o fechamento do modal 
 */
if (btnFecharPerfilHeader.click || btnFecharPerfilFooter.click) {
    clearInputData();
}

// Reseta os valores do modal de perfil 
function clearInputData() {
    document.getElementById("nomeCompletoDoVoluntario").value = "";
    document.getElementById("cpfDoVoluntario").value = "";
    document.getElementById("emailDoVoluntario").value = "";
    document.getElementById("telefoneDoVoluntario").value = "";
    document.getElementById("sexoMasculino").checked = false;
    document.getElementById("sexoFeminino").checked = false;
    document.getElementById("faixaEtariaDoVoluntario").value = "";
    document.getElementById("nomeContatoDoVoluntario").value = "";
    document.getElementById("telefoneContatoDoVoluntario").value = "";
    document.getElementById("cepDoVoluntario").value = "";
    document.getElementById("enderecoDoVoluntario").value = "";
    document.getElementById("bairroDoVoluntario").value = "";
    document.getElementById("cidadeDoVoluntario").value = "";
    document.getElementById("estadoDoVoluntario").value = "";
    document.getElementById("descendenteSim").checked = false;
    document.getElementById("descendenteNao").checked = false;
    document.getElementById("ascendenciaDoVoluntarioDescendente").value = "";
    document.getElementById("idiomaVoluntarioIngles").checked = false;
    document.getElementById("idiomaVoluntarioJapones").checked = false;
    document.getElementById("idiomaVoluntarioEspanhol").checked = false;
    document.getElementById("conhecimentoLibrasSim").checked = false;
    document.getElementById("conhecimentoLibrasNao").checked = false;
    document.getElementById("treinamentoSim").checked = false;
    document.getElementById("treinamentoNao").checked = false;
    document.getElementById("nivelEscolaridadeVoluntario").value = "";
    document.getElementById("trabalhaSim").checked = false;
    document.getElementById("trabalhaNao").checked = false;
}