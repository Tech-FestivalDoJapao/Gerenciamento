// Initializa a integração com o Firebase
import { db } from "../firebaseConfig.mjs";
import { doc, setDoc } from "firebase/firestore";

import './cards.mjs';

/**
 * Identifica a opção de cadastro de credenciais selecionada
 */
const CadastrarTotalDeCredenciais = document.getElementById("btnCadastrarCredenciais");
CadastrarTotalDeCredenciais.addEventListener("click", async () => {
    /**
     * Obtém a opção de cadastro único de credenciais selecionada pelo usuário
     */
    const opcaoCadastroUnico = document.getElementById('cadastroUnicoDeCredenciais');
    if (opcaoCadastroUnico.className !== "mt-3 d-none") {
        /**
         * Obtém a quantidade de credenciais informada pelo usuário 
         */
        const qtdeCredenciais = document.getElementById('qtdeCredenciaisEvento').value;
        /**
         * Verifica se a quantidade de credenciais informada é válida (maior que zero) 
         * e a cadastra no banco de dados
         */ 
        if (qtdeCredenciais > 0) {
            try {
                await setDoc(doc(db, "recursos", "credencial"), {
                    qtde_credenciais: parseInt(qtdeCredenciais),
                    qtde_credencial_disponivel: 0,
                    qtde_credencial_usada: 0
                });

                console.log("Credenciais cadastradas com sucesso!");                   
            } catch (erro) {
                console.error("Erro ao cadastrar credenciais: \n" + erro); 
            }
        }
    }

    /**
     * Obtém a opção de cadastro individual de credenciais selecionada pelo usuário
     */
    const opcaoCadastroIndividual = document.getElementById('cadastroIndividualDeCredenciais');
    if (opcaoCadastroIndividual.className !== "mt-3 d-none") {
        /**
         * Obtém a quantidade de credenciais informada pelo usuário para cada dia do evento
         */
        const qtdeCredenciaisSexta = document.getElementById('qtdeCredenciaisDia1').value;
        const qtdeCredenciaisSabado = document.getElementById('qtdeCredenciaisDia2').value;
        const qtdeCredenciaisDomingo = document.getElementById('qtdeCredenciaisDia3').value;

        // Calcula a quantidade total de credenciais informadas pelo usuário
        const qtdeTotalCredenciais = parseInt(qtdeCredenciaisSexta) + parseInt(qtdeCredenciaisSabado) + parseInt(qtdeCredenciaisDomingo);
        /**
         * Verifica se a quantidade de credenciais informada para cada dia é válida (maior que zero) 
         * e a cadastra no banco de dados
         */ 
        if (qtdeCredenciaisSexta && qtdeCredenciaisSabado && qtdeCredenciaisDomingo > 0) {
            try {
                await setDoc(doc(db, "recursos", "credencial"), {
                    qtde_credenciais: qtdeTotalCredenciais,
                    qtde_credencial_disponivel: 0,
                    qtde_credencial_usada: 0,

                    // Credenciais por dia (não é necessário, mas pode ser útil)
                    qtde_credencial_sexta: parseInt(qtdeCredenciaisSexta),
                    qtde_credencial_sabado: parseInt(qtdeCredenciaisSabado),
                    qtde_credencial_domingo: parseInt(qtdeCredenciaisDomingo)
                });

                console.log("Credenciais cadastradas com sucesso!");                   
            } catch (erro) {
                console.error("Erro ao cadastrar credenciais: \n" + erro); 
            }
        }
    }
});