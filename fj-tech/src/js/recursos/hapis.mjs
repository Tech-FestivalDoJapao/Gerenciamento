// Initializa a integração com o Firebase
import { db } from "../firebaseConfig.mjs";
import { doc, getDoc, setDoc } from "firebase/firestore";

import './cards.mjs';

/**
 * Identifica a opção de cadastro de hapis selecionada
 */
const CadastrarTotalDeHapis = document.getElementById("btnCadastrarHapis");
CadastrarTotalDeHapis.addEventListener("click", async () => {
    /**
     * Obtém a opção de cadastro único de hapis selecionada pelo usuário
     */
    const opcaoCadastroUnico = document.getElementById('cadastroUnicoDeHapis');
    if (opcaoCadastroUnico.className !== "mt-3 d-none") {
        /**
         * Obtém a quantidade de hapis informada pelo usuário 
         */
        const qtdeHapis = document.getElementById('qtdeHapisEvento').value;
        /**
         * Verifica se a quantidade de hapis informada é válida (maior que zero) 
         * e a cadastra no banco de dados
         */
        if (qtdeHapis > 0) {
            try {
                await setDoc(doc(db, "recursos", "hapi"), {
                    qtde_hapi: parseInt(qtdeHapis),
                    qtde_hapi_disponivel: parseInt(qtdeHapis),
                    qtde_hapi_usado: 0
                });

                console.log("Hapis cadastrados com sucesso!");
            } catch (erro) {
                console.error("Erro ao cadastrar hapis: \n" + erro);
            }
        }
    }

    /**
     * Obtém a opção de cadastro individual de hapis selecionada pelo usuário
     */
    const opcaoCadastroIndividual = document.getElementById('cadastroIndividualDeHapis');
    if (opcaoCadastroIndividual.className !== "mt-3 d-none") {
        /**
         * Obtém a quantidade de hapis informada pelo usuário para cada dia do evento
         */
        const qtdeHapisSexta = document.getElementById('qtdeHapisDia1').value;
        const qtdeHapisSabado = document.getElementById('qtdeHapisDia2').value;
        const qtdeHapisDomingo = document.getElementById('qtdeHapisDia3').value;

        // Calcula a quantidade total de hapis informadas pelo usuário
        const qtdeTotalHapis = parseInt(qtdeHapisSexta) + parseInt(qtdeHapisSabado) + parseInt(qtdeHapisDomingo);
        console.log(qtdeTotalHapis);
        /**
         * Verifica se a quantidade de hapis informada para cada dia é válida (maior que zero) 
         * e a cadastra no banco de dados
         */
        if (qtdeHapisSexta && qtdeHapisSabado && qtdeHapisDomingo > 0) {
            try {
                await setDoc(doc(db, "recursos", "hapi"), {
                    qtde_hapi: qtdeTotalHapis,
                    qtde_hapi_disponivel: qtdeTotalHapis,
                    qtde_hapi_usado: 0,

                    // Hapis por dia (não é necessário, mas pode ser útil)
                    qtde_hapi_sexta: parseInt(qtdeHapisSexta),
                    qtde_hapi_sabado: parseInt(qtdeHapisSabado),
                    qtde_hapi_domingo: parseInt(qtdeHapisDomingo)
                });

                console.log("Hapis cadastrados com sucesso!");
            } catch (erro) {
                console.error("Erro ao cadastrar hapis: \n" + erro);
            }
        }
    }

    // Reseta o estado do modal de cadastro de hapis
    desmarcaOpcoesDeCadastro();
    limparCampos();

    // Atualiza os card de hapis na tela de recursos
    atualizaInformacaoCard();
});

/**
 * Limpa os valores de todos os campos do modal de cadastro de quantidade de hapis
 */
function limparCampos() {
    // Opção de adastro único
    document.getElementById('qtdeHapisEvento').value = "";

    // Opção de cadastro individual
    document.getElementById('qtdeHapisDia1').value = "";
    document.getElementById('qtdeHapisDia2').value = "";
    document.getElementById('qtdeHapisDia3').value = "";
};

/**
 * Desmarca as opções de cadastro de hapis e oculta seus respectivos formulários
 */
function desmarcaOpcoesDeCadastro() {
    // Opção de adastro único
    document.getElementById('cadastroUnicoDeHapis').removeAttribute('checked');
    document.getElementById('cadastroUnicoDeHapis').classList.add('d-none');

    // Opção de cadastro individual
    document.getElementById('cadastroIndividualDeHapis').removeAttribute('checked');
    document.getElementById('cadastroIndividualDeHapis').classList.add('d-none');
}

/**
 * Atualiza os dados do card de disponibilidade de hapis após alguma açao do usuário
 */
async function atualizaInformacaoCard() {
    const hapiDoc = await getDoc(doc(db, "recursos", "hapi"));

    document.getElementById("hapisTotal").innerHTML = hapiDoc.data().qtde_hapi;
    document.getElementById("hapisEmUso").innerHTML = hapiDoc.data().qtde_hapi_usado;
    document.getElementById("hapisDisponiveis").innerHTML = hapiDoc.data().qtde_hapi_disponivel;
}