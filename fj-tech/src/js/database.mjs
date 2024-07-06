// Initialize Firebase
import { db } from "./firebaseConfig.mjs";

// Add a new document with a generated id.
import { collection, query, where, getDocs } from "firebase/firestore";

// Querys de interação com o banco de dados
const q = query(collection(db, "voluntario"), where("nome_completo_voluntario", "!=", null));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    console.log(doc.id);

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