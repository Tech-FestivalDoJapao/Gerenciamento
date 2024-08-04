// Initializa a integração com o Firebase
import { db } from "../firebaseConfig.mjs";
import { doc, setDoc } from "firebase/firestore";

import './cards.mjs';

/**
 * Identifica a opção de cadastro de vouchers selecionada
 */
const CadastrarTotalDeVouchers = document.getElementById("btnCadastrarVouchers");
CadastrarTotalDeVouchers.addEventListener("click", async () => {
    /**
     * Obtém a opção de cadastro único de vouchers selecionada pelo usuário
     */
    const opcaoCadastroUnico = document.getElementById('cadastroUnicoVoucher');
    if (opcaoCadastroUnico.className !== "mt-3 d-none") {
        /**
         * Obtém a quantidade de vouchers informada pelo usuário 
         */
        const qtdeVouchers = document.getElementById('qtdeVouchersEvento').value;
        /**
         * Verifica se a quantidade de vouchers informada é válida (maior que zero) 
         * e a cadastra no banco de dados
         */
        if (qtdeVouchers > 0) {
            try {
                await setDoc(doc(db, "recursos", "voucher"), {
                    qtde_vouchers: parseInt(qtdeVouchers),                    
                    qtde_vouchers_disponiveis: parseInt(qtdeVouchers),
                    qtde_vouchers_usado: 0,

                    // Vouchers por tipo (não é necessário, mas pode ser útil)
                    qtde_vouchers_por_tipo: {
                        qtde_voucher_almoco: 0,
                        qtde_voucher_jantar: 0,
                        qtde_voucher_lanche: 0
                    }                    
                });

                console.log("Vouchers cadastrados com sucesso!");
            } catch (erro) {
                console.error("Erro ao cadastrar vouchers: \n" + erro);
            }
        }
    }

    /**
     * TODO: Obtém a opção de cadastro individual de vouchers selecionada pelo usuário
     */
    const opcaoCadastroIndividual = document.getElementById('cadastroIndividualDeVouchers');
    if (opcaoCadastroIndividual.className !== "mt-3 d-none") {
        /**
         * TODO: Obtém a quantidade de vouchers informada pelo usuário para cada dia do evento
         */
    };

    // Reseta o estado do modal de cadastro de vouchers
    desmarcaOpcoesDeCadastro();
    limparCampos();
});

/**
 * Limpa os valores de todos os campos do modal de cadastro de quantidade de vouchers
 */
function limparCampos() {
    // Opção de adastro único
    document.getElementById('qtdeVouchersEvento').value = "";

    // TODO: Opção de cadastro individual
};

/**
 * Desmarca as opções de cadastro de vouchers e oculta seus respectivos formulários
 */
function desmarcaOpcoesDeCadastro() {
    // Opção de adastro único
    document.getElementById('cadastroUnicoVoucher').removeAttribute('checked');
    document.getElementById('cadastroUnicoVoucher').classList.add('d-none');

    // Opção de cadastro individual
    document.getElementById('cadastroIndividualVoucher').removeAttribute('checked');
    document.getElementById('cadastroIndividualVoucher').classList.add('d-none');
}