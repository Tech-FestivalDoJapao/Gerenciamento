// Initializa a integração com o Firebase
import { db } from "../../firebaseConfig.mjs";
import { doc, getDoc, setDoc } from "firebase/firestore";

import '../lista.mjs';

// Obtém o ano da edição atual do festival
import { edicaoAtualFestival } from "../lista.mjs";
import { btnFinalizaIntervalo } from "./turno.mjs";

// Obtém os elementos referentes ao resgate de voucher do voluntário
const btnResgateVoucher = document.getElementById("cadastraResgateVoucher");
const optResgateVoucher = document.getElementById("tipoVoucher");
const txtResgateVoucher = document.getElementById("informacoesResgateVoucher");

/**
 * Exibe as informações refentes à edição atual do festival relacionadas ao voluntário
 * no offcanvas de gestão de recursos do voluntário no festival
 */
document.getElementById("corpoTabelaDeListagemDeVoluntarios").addEventListener("click", async (event) => {
    // Limpa o campo de informações de resgate de voucher
    limpaInformacoesResgateVoucher();

    // Acessa as informações do voluntário
    const idVoluntario = event.target.closest("tr").id;
    const docVoluntarioRef = doc(db, "voluntario", idVoluntario);
    const docFestivalRef = doc(docVoluntarioRef, 'festival', edicaoAtualFestival);
    const festival = await getDoc(docFestivalRef);

    // Identifica o último intervalo cadastrado para obter a retirada de voucher
    const horariosSexta = festival.data().expediente.horarios_sexta.intervalo;
    let ultimoIntervalo = Object.keys(horariosSexta).pop();

    const resgateVoucherOcorreu = horariosSexta.intervalo_1.resgate_voucher;
    if (resgateVoucherOcorreu) {
        exibeInformacaoresgateVoucher(resgateVoucherOcorreu); 
    } else {
        limpaInformacoesResgateVoucher();
    }

    /**
     * Associa o tipo de voucher selecionado ao voluntário
     */
    btnResgateVoucher.addEventListener("click", async (event) => {
        let tipoVoucherDoVoluntario = optResgateVoucher.value;
        
        await setDoc(docFestivalRef, {
            expediente: {
                horarios_sexta: {
                    intervalo: {
                        [ultimoIntervalo]: {
                            resgate_voucher: tipoVoucherDoVoluntario,
                        }
                    }
                }
            }
        }, { merge: true }).then(() => {
            console.log("Voucher resgatado com sucesso");

            exibeInformacaoresgateVoucher(tipoVoucherDoVoluntario);
            bloquearResgateVoucher();
        }).catch((erro) => {
            console.error("Erro ao resgatar voucher: ", erro);
        });
    });
});

/**
 * TODO: Valida o resgate de voucher baseado no turno do voluntário
 */

export function bloquearResgateVoucher() {
    // Desabilita o campo de seleção de voucher
    optResgateVoucher.disabled = true;
    optResgateVoucher.classList.remove("is-invalid");

    // Desabilita o botão de resgate de voucher
    btnResgateVoucher.disabled = true;
    btnResgateVoucher.style.cursor = "not-allowed";

    // Limpa o campo de seleção de voucher
    if (btnFinalizaIntervalo.classList.contains("btn-outline-danger")) {
        optResgateVoucher.value = optResgateVoucher.options[0].value;
    }
}

export function desbloquearResgateVoucher() {
    // Habilita o campo de seleção de voucher
    optResgateVoucher.disabled = false;

    // Habilita o botão de resgate de voucher
    btnResgateVoucher.disabled = false;
    btnResgateVoucher.style.cursor = "pointer";
}

function exibeInformacaoresgateVoucher(voucher) {
    // Exibe o tipo de voucher resgatado pelo voluntário
    const identificaVoucherResgatado = document.createElement('small');
    identificaVoucherResgatado.className = 'opacity-50 m-0 px-4';
    identificaVoucherResgatado.textContent = `Voucher resgatado: ${voucher}`;

    // Remove as informações anteriores de resgate de voucher
    if (txtResgateVoucher.firstChild) {
        txtResgateVoucher.removeChild(txtResgateVoucher.firstChild);
    }

    txtResgateVoucher.appendChild(identificaVoucherResgatado);
}

function limpaInformacoesResgateVoucher() {
    // Limpa o campo de informações de resgate de voucher
    txtResgateVoucher.textContent = "";
}