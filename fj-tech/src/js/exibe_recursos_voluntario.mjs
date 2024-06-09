import { firebaseConfig } from "./firebaseConfig.mjs";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function buscaRecursosVoluntario(idenficaVolutario) {
    // Referencia a tabela de voluntários no banco de dados
    const voluntariosRef = collection(db, 'voluntario');
    // Realiza o select dos usuários na tabela de voluntários através da pesquisa por nome
    const q = query(voluntariosRef, where('nome_completo_voluntario', '==', idenficaVolutario));
    const querySnapshot = await getDocs(q);

    const recursos = [];

    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().nome_completo_voluntario);
        recursos.push(doc.data());
    });

    return recursos;
}
/*
document.getElementById('GerenciarRecursosDoVoluntarioNoFestival').addEventListener('click', async (event) => {
    const nome = document.getElementById('nomeVoluntario').value;
    const resultados = await buscaRecursosVoluntario(nome);

    atualizaOffcanvas(resultados);

});
*/
/**
 * Atuaiza o offcanvas com os recursos do voluntário selecionado 
 */
function atualizaOffcanvas(recursos) {
    const formOffCanvas = document.getElementById('gestaoRecusosVoluntarioNoFestival');

    // Limpa os valores que estavam no OffCanvas
    formOffCanvas.innerHTML = '<div> Ocorreu um problema ao carregar os recursos relacionados ao voluntário </div';

    recursos.forEach(rec => {
        formOffCanvas.innerHTML +=
            `<div class="mb-5">
                <p class="mb-2 h5">Credencial</p>
                <div class="mb-3">
                    <label for="codigoCredencial" class="form-label">Código da credencial associada:</label>
                    <input type="text" class="form-control" id="codigoCredencial" value="${rec.id}" disabled>
                </div>
            </div>

            <div class="mb-5">
                <p class="mb-2 h5">Horários</p>
                <div class="row">
                    <div class="col">
                        <label for="horarioCheckIn" class="form-label">Check-in</label>
                        <input type="time" class="form-control" id="horarioCheckIn" required value="${rec.voluntariado.horarios.horario_checkin}">
                    </div>
                    <div class="col">
                        <label for="horarioCheckout" class="form-label">Checkout</label>
                        <input type="time" class="form-control" id="horarioCheckout" required>
                    </div>

                    <div>
                        <label for="horarioIntervalo" class="form-label">Iniciar intervalo</label>
                        <div class="hstack gap-3">
                            <input id="horarioIntervalo" class="form-control me-auto" type="time" placeholder="Add your item here..."
                                aria-label="Add your item here...">
                            <button type="button" class="btn btn-outline-danger active">Iniciar</button>
                            <button type="button" class="btn btn-outline-danger">Terminar</button>
                        </div>

                        <span id="horarioInicioIntervalo">
                            <!-- Aqui você pode listar os horários de intervalo -->
                        </span>
                    </div>
                </div>
            </div>

            <div class="mb-5">
                <p class="mb-2 h5">Hapi</p>
                <div class="row">
                    <div class="col">
                        <select id="tamanhoHapi" class="form-select" required>
                            <option selected hidden>Tamanho do hapi</option>
                            <option value="P">P</option>
                            <option value="M">M</option>
                            <option value="G">G</option>
                            <option value="GG">GG</option>
                            <option value="XG">XG</option>
                        </select>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1"> Resgatado </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-5">
                <p class="mb-2 h5">Voucher</p>
                <div class="row">
                    <div class="col">
                        <label for="tamanhoHapi" class="form-select-label">Selecione o tipo de voucher a ser entregue:</label>
                        <select id="tamanhoHapi" class="form-select" required>
                            <option selected hidden>Tipo de voucher</option>
                            <option value="1">Almoço</option>
                            <option value="2">Jantar</option>
                            <option value="3">Kit lanche</option>
                        </select>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1"> Resgatado </label>
                        </div>
                    </div>
                </div>
            </div>`;
    });
}