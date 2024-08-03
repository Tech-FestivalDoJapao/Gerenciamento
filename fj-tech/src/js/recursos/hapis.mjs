// Initializa a integração com o Firebase
import { db } from "../firebaseConfig.mjs";
import { doc, setDoc } from "firebase/firestore";

import './cards.mjs';

/**
 * Identifica a opção de cadastro de hapis selecionada
 */
const CadastrarTotalDeHapis = document.getElementById("btnCadastrarHapis");
CadastrarTotalDeHapis.addEventListener("click", async () => {
    console.log("Cadastrar hapis");
    /**
     * Obtém a opção de cadastro único de hapis selecionada pelo usuário
     */
    const opcaoCadastroUnico = document.getElementById('cadastroUnicoDeHapis');
    if (opcaoCadastroUnico.className !== "mt-3 d-none") {
        console.log("Cadastro único de hapis");
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
                    qtde_hapi_disponivel: 0,
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
        console.log("Cadastro individual de hapis");
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
                    qtde_hapi_disponivel: 0,
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
});