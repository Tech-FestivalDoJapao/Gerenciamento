// Initializa a integração com o Firebase
import { db } from "./../firebaseConfig.mjs";
import { doc, getDoc } from "firebase/firestore";

import './lista.mjs';

/**
 * Identifica o id do voluntário cujo perfil será exibido
 */
document.querySelectorAll("tr").forEach((tr) => {
    tr.addEventListener("click", async () => {
        const idPerfilVoluntario = tr.id;

        /**
         * Exibe as informações mais relevantes do voluntário na tela de perfil
         */
        const docRef = doc(db, "voluntario", idPerfilVoluntario);
        const perfil = await getDoc(docRef);

        if (perfil.exists()) {
            //console.log("Document data:", perfil.data());

            /**
             * Dados Pessoais 
             */
            document.getElementById("nomeCompletoDoVoluntario").value = perfil.data().nome_completo_voluntario;
            document.getElementById("cpfDoVoluntario").value = perfil.data().cpf_voluntario;
            document.getElementById("emailDoVoluntario").value = perfil.data().contato_voluntario.email_voluntario;
            document.getElementById("telefoneDoVoluntario").value = perfil.data().contato_voluntario.celular_voluntario;

            (perfil.data().sexo_voluntario === "Masculino")
                ? document.getElementById("sexoMasculino").checked = true
                : document.getElementById("sexoFeminino").checked = true;

            perfil.data().faixa_etaria_voluntario.forEach((faixaEtaria) => {
                document.getElementById("faixaEtariaDoVoluntario").value += faixaEtaria;
            });

            /**
             * Contato de Emergência
             */
            document.getElementById("nomeContatoDoVoluntario").value = perfil.data().contato_emergencia_voluntario.nome_contato_emergencia;
            document.getElementById("telefoneContatoDoVoluntario").value = perfil.data().contato_emergencia_voluntario.telefone_contato_emergencia;

            /**
             * Endereço do Voluntário
             */
            document.getElementById("cepDoVoluntario").setAttribute("readonly", true);
            document.getElementById("cepDoVoluntario").value = perfil.data().endereco_voluntario.cep;

            document.getElementById("enderecoDoVoluntario").value = perfil.data().endereco_voluntario.logradouro;
            document.getElementById("bairroDoVoluntario").value = perfil.data().endereco_voluntario.bairro;
            document.getElementById("cidadeDoVoluntario").value = perfil.data().endereco_voluntario.cidade;
            document.getElementById("estadoDoVoluntario").value = perfil.data().endereco_voluntario.estado;

            /**
             * Dados Adicionais
             */
            document.getElementById("ascendente").setAttribute("hidden", true);
            if (perfil.data().descendencia_voluntario.descendente_japones === true) {
                document.getElementById("descendenteSim").checked = true;
                document.getElementById("ascendente").removeAttribute("hidden");
            } else {
                document.getElementById("descendenteNao").checked = true;
            }

            perfil.data().descendencia_voluntario.ascendencia_voluntario.forEach((ascendencia) => {
                document.getElementById("ascendenciaDoVoluntarioDescendente").value += ascendencia;
            });

            // Idiomas
            // Conhecimento em Ingl~Es
            document.getElementById("idiomaVoluntarioIngles").removeAttribute("checked", true);
            (perfil.data().escolaridade_voluntario.conhecimento_voluntario.idioma_ingles === true)
                ? document.getElementById("idiomaVoluntarioIngles").setAttribute("checked", true)
                : document.getElementById("idiomaVoluntarioIngles").removeAttribute("checked");
            // Conhecimento em Japonês
            document.getElementById("idiomaVoluntarioJapones").removeAttribute("checked", true);
            (perfil.data().escolaridade_voluntario.conhecimento_voluntario.idioma_japones === true)
                ? document.getElementById("idiomaVoluntarioJapones").setAttribute("checked", true)
                : document.getElementById("idiomaVoluntarioJapones").removeAttribute("checked");
            // Conhecimento em Espanhol
            document.getElementById("idiomaVoluntarioEspanhol").removeAttribute("checked", true);
            (perfil.data().escolaridade_voluntario.conhecimento_voluntario.idioma_espanhol === true)
                ? document.getElementById("idiomaVoluntarioEspanhol").setAttribute("checked", true)
                : document.getElementById("idiomaVoluntarioEspanhol").removeAttribute("checked");

            // Conhecimento em Libras
            (perfil.data().escolaridade_voluntario.conhecimento_voluntario.linguagem_libras === true)
                ? document.getElementById("conhecimentoLibrasSim").checked = true
                : document.getElementById("conhecimentoLibrasNao").checked = true;

            // Treinamento em Primeiros Socorros
            (perfil.data().escolaridade_voluntario.treinamento_primeiros_socorros === true)
                ? document.getElementById("treinamentoSim").checked = true
                : document.getElementById("treinamentoNao").checked = true;

            // Escolaridade
            perfil.data().escolaridade_voluntario.nivel_escolaridade_voluntario.forEach((nivelEscolaridade) => {
                document.getElementById("nivelEscolaridadeVoluntario").value += nivelEscolaridade;
            });

            // Trabalho
            (perfil.data().carreira_voluntario.trabalha_atualmente === true)
                ? document.getElementById("trabalhaSim").checked = true
                : document.getElementById("trabalhaNao").checked = true;
        } else {
            // perfil.data() retornará undefined
            console.log("Não foi possível encontrar o perfil deste voluntário.");
        }

    });
});

/**
 * Limpar modal de perfil do voluntário após fechamento
 */
document.getElementById("btnFecharPerfilHeader").addEventListener("click", () => {
    clearInputData();
});

document.getElementById("btnFecharPerfilFooter").addEventListener("click", () => {
    clearInputData();
});

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

    //console.log("Fechando modal de perfil do voluntário.");
}