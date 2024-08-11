// Initializa a integração com o Firebase
import { db } from "../firebaseConfig.mjs";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

                    // Vouchers por dia (não é necessário, mas pode ser útil)
                    qtde_vouchers_por_dia: {
                        qtde_voucher_sexta: null,
                        qtde_voucher_sabado: null,
                        qtde_voucher_domingo: null
                    },

                    // Vouchers por tipo (não é necessário, mas pode ser útil)
                    qtde_vouchers_por_tipo: {
                        qtde_voucher_almoco: null,
                        qtde_voucher_jantar: null,
                        qtde_voucher_lanche: null
                    }
                });

                console.log("Vouchers cadastrados com sucesso!");
            } catch (erro) {
                console.error("Erro ao cadastrar vouchers: \n" + erro);
            }
        }
    }

    /**
     * Obtém a opção de cadastro individual de vouchers selecionada pelo usuário
     */
    const opcaoCadastroIndividual = document.getElementById('cadastroIndividualDeVouchers');
    if (opcaoCadastroIndividual.className !== "mt-3 d-none") {
        /**
         * Obtém a quantidade de vouchers informada pelo usuário para cada dia do evento
         */
        const qtdeVouchersSexta = document.getElementById('qtdeVouchersDia1').value;
        const qtdeVouchersSabado = document.getElementById('qtdeVouchersDia2').value;
        const qtdeVouchersDomingo = document.getElementById('qtdeVouchersDia3').value;

        // Calcula a quantidade total de vouchers informadas pelo usuário
        const qtdeTotalVouchers = parseInt(qtdeVouchersSexta) + parseInt(qtdeVouchersSabado) + parseInt(qtdeVouchersDomingo);
        /**
         * Verifica se a quantidade de vouchers informada para cada dia é válida (maior que zero) 
         * e a cadastra no banco de dados
         */
        if (qtdeVouchersSexta && qtdeVouchersSabado && qtdeVouchersDomingo > 0) {
            try {
                await setDoc(doc(db, "recursos", "voucher"), {
                    qtde_vouchers: qtdeTotalVouchers,
                    qtde_vouchers_disponiveis: qtdeTotalVouchers,
                    qtde_vouchers_usado: 0,

                    // Vouchers por dia (não é necessário, mas pode ser útil)
                    qtde_vouchers_por_dia: {
                        qtde_voucher_sexta: parseInt(qtdeVouchersSexta),
                        qtde_voucher_sabado: parseInt(qtdeVouchersSabado),
                        qtde_voucher_domingo: parseInt(qtdeVouchersDomingo)
                    },

                    // Vouchers por tipo (não é necessário, mas pode ser útil)
                    qtde_vouchers_por_tipo: {
                        qtde_voucher_almoco: null,
                        qtde_voucher_jantar: null,
                        qtde_voucher_lanche: null
                    }
                });

                console.log("Vouchers cadastrados com sucesso!");
            } catch (erro) {
                console.error("Erro ao cadastrar vouchers: \n" + erro);
            }
        }
    };

    /**
     * Obtém a opção de cadastro de vouchers por tipo selecionada pelo usuário
     */
    const opcaoCadastroPorTipo = document.getElementById('cadastroPorTipoDeVoucher');
    if (opcaoCadastroPorTipo.className !== "mt-3 d-none") {
        /**
         * TODO: Obtém a quantidade de vouchers informada pelo usuário para cada tipo (almoço, jantar, lanche)
         */
        const qtdeVouchersAlmoco = document.getElementById('qtdeVouchersAlmoco').value;
        const qtdeVouchersJantar = document.getElementById('qtdeVouchersJantar').value;
        const qtdeVouchersKitLanche = document.getElementById('qtdeVouchersKitLanche').value;

        // Calcula a quantidade total de vouchers informadas pelo usuário
        const qtdeTotalVouchers = parseInt(qtdeVouchersAlmoco) + parseInt(qtdeVouchersJantar) + parseInt(qtdeVouchersKitLanche);
        /**
         * Verifica se a quantidade de vouchers informada para cada tipo é válida (maior que zero)
         * e a cadastra no banco de dados
         *  */
        if (qtdeVouchersAlmoco && qtdeVouchersJantar && qtdeVouchersKitLanche > 0) {
            try {
                await setDoc(doc(db, "recursos", "voucher"), {
                    qtde_vouchers: qtdeTotalVouchers,
                    qtde_vouchers_disponiveis: qtdeTotalVouchers,
                    qtde_vouchers_usado: 0,

                    // Vouchers por dia (não é necessário, mas pode ser útil)
                    qtde_vouchers_por_dia: {
                        qtde_voucher_sexta: null,
                        qtde_voucher_sabado: null,
                        qtde_voucher_domingo: null
                    },

                    // Vouchers por tipo (não é necessário, mas pode ser útil)
                    qtde_vouchers_por_tipo: {
                        qtde_voucher_almoco: parseInt(qtdeVouchersAlmoco),
                        qtde_voucher_jantar: parseInt(qtdeVouchersJantar),
                        qtde_voucher_lanche: parseInt(qtdeVouchersKitLanche)
                    }
                });

                console.log("Vouchers cadastrados com sucesso!");
            } catch (erro) {
                console.error("Erro ao cadastrar vouchers: \n" + erro);
            }
        }
    };

    // Reseta o estado do modal de cadastro de vouchers
    desmarcaOpcoesDeCadastro();
    limparCampos();

    // Atualiza os card de vouchers na tela de recursos
    atualizaInformacaoCard();
});

/**
 * Limpa os valores de todos os campos do modal de cadastro de quantidade de vouchers
 */
function limparCampos() {
    // Opção de adastro único
    document.getElementById('qtdeVouchersEvento').value = "";

    // TODO: Opção de cadastro individual
    document.getElementById('qtdeVouchersDia1').value = "";
    document.getElementById('qtdeVouchersDia2').value = "";
    document.getElementById('qtdeVouchersDia3').value = "";

    // TODO: Opção de cadastro por tipo
    document.getElementById('qtdeVouchersAlmoco').value = "";
    document.getElementById('qtdeVouchersJantar').value = "";
    document.getElementById('qtdeVouchersKitLanche').value = "";
};

/**
 * Desmarca as opções de cadastro de vouchers e oculta seus respectivos formulários
 */
function desmarcaOpcoesDeCadastro() {
    // Opção de adastro único
    document.getElementById('cadastroUnicoVoucher').removeAttribute('checked');
    document.getElementById('cadastroUnicoDeVouchers').classList.add('d-none');

    // Opção de cadastro individual
    document.getElementById('cadastroIndividualVoucher').removeAttribute('checked');
    document.getElementById('cadastroIndividualDeVouchers').classList.add('d-none');

    // Opção de cadastro por tipo
    document.getElementById('cadastroTipoVoucher').removeAttribute('checked');
    document.getElementById('cadastroPorTipoDeVoucher').classList.add('d-none');
}

/**
 * Atualiza os dados de disponibilidade de vouchers após alguma açao do usuário
 */
async function atualizaInformacaoCard() {
    const voucherDoc = await getDoc(doc(db, "recursos", "voucher"));

    document.getElementById("vouchersTotal").innerHTML = voucherDoc.data().qtde_vouchers;
    document.getElementById("vouchersDisponiveis").innerHTML = voucherDoc.data().qtde_vouchers_disponiveis;
    document.getElementById("vouchersResgatados").innerHTML = voucherDoc.data().qtde_vouchers_usado;

    // Dados referentes à distribuição de Vouchers por tipo
    const vouchersAlmoco = voucherDoc.data().qtde_vouchers_por_tipo.qtde_voucher_almoco;
    const vouchersJantar = voucherDoc.data().qtde_vouchers_por_tipo.qtde_voucher_jantar;
    const vouchersLanche = voucherDoc.data().qtde_vouchers_por_tipo.qtde_voucher_lanche;

    // Exibe o card com a quantidade de vouchers por tipo
    (vouchersAlmoco !== null || vouchersJantar !== null || vouchersLanche !== null)
        ? document.getElementById('vouchersPorTipo').classList.remove('d-none')
        : document.getElementById('vouchersPorTipo').classList.add('d-none');

    document.getElementById("vouchersAlmoco").innerHTML = vouchersAlmoco;
    document.getElementById("vouchersJantar").innerHTML = vouchersJantar;
    document.getElementById("vouchersKitLanche").innerHTML = vouchersLanche;
} 