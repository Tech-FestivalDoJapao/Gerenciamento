// Initializa a integração com o Firebase
import { db } from "../../firebaseConfig.mjs";
import { doc, getDoc, Timestamp, setDoc, updateDoc } from "firebase/firestore";

import '../lista.mjs';

import { edicaoAtualFestival } from "../lista.mjs";
import { bloquearResgateVoucher, desbloquearResgateVoucher } from "./resgate_voucher.mjs";
import { bloquearInicioIntervalo, bloquearTerminoIntervalo, desbloquearInicioIntervalo, desbloquearTerminoIntervalo } from "./turno.mjs";

// Lista de voluntários
const listaDeVoluntarios = document.getElementById("corpoTabelaDeListagemDeVoluntarios");

// Obtém os elementos refentes ao início e término do intervalo do voluntário
const btnInicioIntervalo = document.getElementById("cadastraInicioIntervalo");
const btnTerminoIntervalo = document.getElementById("cadastraTerminoIntervalo");
// Obtém a div para exibição dos horários de intervalo
const badgeHorariosIntervalo = document.getElementById("horariosDeIntervalo");

/**
 *TODO: Associa um horário de início de intervalo ao voluntário
 */

/**
 * TODO: Associa um horário de término de intervalo ao voluntário
 */
listaDeVoluntarios.addEventListener("click", async (event) => {
    // Limpa a exibição dos horários de intervalo
    badgeHorariosIntervalo.textContent = "";

    // Acessa as informações do voluntário
    const idVoluntario = event.target.closest("tr").id;
    const docVoluntarioRef = doc(db, "voluntario", idVoluntario);
    const docFestivalRef = doc(docVoluntarioRef, 'festival', edicaoAtualFestival);
    const festival = await getDoc(docFestivalRef);

    // Obtém o horário já existente no banco
    const horariosIntervalo = festival.data().expediente.horarios_sexta.intervalo;   
        const inicioIntervalo = horariosIntervalo.intervalo_1.inicio_intervalo;
        const terminoIntervalo = horariosIntervalo.intervalo_1.termino_intervalo;

    if (inicioIntervalo === null && terminoIntervalo === null) {
        bloquearResgateVoucher();

        console.log("Sem intervalo");

        btnInicioIntervalo.addEventListener("click", async () => {
            cadastraInicioIntervalo(docFestivalRef, horariosIntervalo);
        });
    }

    if (inicioIntervalo !== null && terminoIntervalo === null) {
        exibeHorarioIntervalo(inicioIntervalo, terminoIntervalo);
        desbloquearResgateVoucher();

        console.log("Intervalo iniciado");
    }

    if (inicioIntervalo !== null && terminoIntervalo !== null) {
        exibeHorarioIntervalo(inicioIntervalo, terminoIntervalo);
        bloquearResgateVoucher();

        console.log("Intervalo finalizado");
    }

    
    btnTerminoIntervalo.addEventListener("click", async () => {
        cadastraTerminoIntervalo(docFestivalRef, horariosIntervalo);
    });
});

/**
 * TODO: Exibe os horários de início e término de intervalo
 */


/**
 * Exibe as informações referentes ao(s) intervalo(s) realizado pelo voluntário
 * @param {Timestamp} inicioIntervalo - Horário de início do intervalo
 * @param {Timestamp} terminoIntervalo - Horário de término do intervalo
 */
function exibeHorarioIntervalo(inicioIntervalo, terminoIntervalo) {
    let inicio = new Date(inicioIntervalo.toDate()).toLocaleTimeString("pt-BR", { hour12: false });

    // Exibe apenas o horário de início do intervalo
    if (inicio !== null && terminoIntervalo === null) {
        badgeHorariosIntervalo.innerHTML = `
            <div class="px-3">
                <small class="row mb-1 px-1 py-2 badge rounded-pill bg-danger bg-opacity-25 text-dark"> 
                    <span> ${inicio} </span>
                </small>
            </div>        
        `;

        return;
    }

    // Exibe o horário de início e término do intervalo
    if (inicio !== null && terminoIntervalo !== null) {
        let termino = new Date(terminoIntervalo.toDate()).toLocaleTimeString("pt-BR", { hour12: false });

        badgeHorariosIntervalo.innerHTML = `
            <div class="px-3">
                <small class="row mb-1 px-1 py-2 badge rounded-pill bg-danger bg-opacity-25 text-dark"> 
                    <span> ${inicio} </span> • <span> ${termino} </span> 
                </small>
            </div>        
        `;

        return;
    }
}   

/**
 * Cadastra o início de um novo intervalo para o voluntário
 * @param {*} docFestivalRef 
 * @param {*} horariosIntervalo 
 */
async function cadastraInicioIntervalo(docFestivalRef, horariosIntervalo) {
    let ultimoIntervalo = Object.keys(horariosIntervalo).pop();
    let identificaIntervalo = ultimoIntervalo.charAt(ultimoIntervalo.length - 1);
    let incrementaIntervalo = String.fromCharCode(identificaIntervalo.charCodeAt(0) + 1);
    let novoIntervalo = `intervalo_${incrementaIntervalo}`;

    if (identificaIntervalo === "1") {
        await setDoc(docFestivalRef, {
            expediente: {
                horarios_sexta: {
                    intervalo: {
                        [ultimoIntervalo]: {
                            inicio_intervalo: new Date(),
                        }
                    }
                }
            }
        }, { merge: true }).then(() => {
            console.log("Início do intervalo " + ultimoIntervalo + " cadastrado com sucesso");
    
            bloquearInicioIntervalo();
            desbloquearTerminoIntervalo();
            desbloquearResgateVoucher();
        }).catch((erro) => {
            console.error("Erro ao cadastrar início de intervalo: ", erro);
        });

        return;
    } 

    await updateDoc(docFestivalRef, {
        "expediente.horarios_sexta.intervalo": {
            ...horariosIntervalo,
            [novoIntervalo]: {
                "inicio_intervalo": new Date(),
                "termino_intervalo": null,
                "resgate_voucher": null,
                "devolucao_hapi": null
            }
        }
    }).then(() => {
        console.log("Início do intervalo " + incrementaIntervalo + " cadastrado com sucesso");
    
        bloquearInicioIntervalo();
        desbloquearTerminoIntervalo();
        desbloquearResgateVoucher();
    }).catch((erro) => {
        console.error("Erro ao cadastrar início de intervalo: ", erro);
    });
}   

function cadastraTerminoIntervalo(docFestivalRef, horariosIntervalo) {
    let ultimoIntervalo = Object.keys(horariosIntervalo).pop();
    let identificaIntervalo = ultimoIntervalo.charAt(ultimoIntervalo.length - 1);

    
        setDoc(docFestivalRef, {
            expediente: {
                horarios_sexta: {
                    intervalo: {
                        [ultimoIntervalo]: {
                            termino_intervalo: new Date(),
                        }
                    }
                }
            }
        }, { merge: true }).then(() => {
            console.log("Término do intervalo " + ultimoIntervalo + " cadastrado com sucesso");
    
            desbloquearInicioIntervalo();
            bloquearTerminoIntervalo();
            bloquearResgateVoucher();
        }).catch((erro) => {
            console.error("Erro ao cadastrar término de intervalo: ", erro);
        });

}