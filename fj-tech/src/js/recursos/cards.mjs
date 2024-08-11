// Initializa a integração com o Firebase
import { db } from "./../firebaseConfig.mjs";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

/**
 * TODO: Exibir as informações de disponibilidade de credenciais, hapis e vouchers
 */
const queryRecursos = query(collection(db, "recursos"));
const querySnapshot = await getDocs(queryRecursos);

querySnapshot.forEach((doc) => {
    //console.log(doc.id, " => ", doc.data());

    // Dados referentes à distribuição de Hapis
    if (doc.id === "hapi") {
        document.getElementById("hapisTotal").innerHTML = doc.data().qtde_hapi;
        document.getElementById("hapisEmUso").innerHTML = doc.data().qtde_hapi_usado;
        document.getElementById("hapisDisponiveis").innerHTML = doc.data().qtde_hapi_disponivel;
    }

    // Dados referentes à distribuição de Vouchers
    if (doc.id === "voucher") {
        const vouchersAlmoco = doc.data().qtde_vouchers_por_tipo.qtde_voucher_almoco;
        const vouchersJantar = doc.data().qtde_vouchers_por_tipo.qtde_voucher_jantar;
        const vouchersLanche = doc.data().qtde_vouchers_por_tipo.qtde_voucher_lanche;

        // Exibe o card com a quantidade de vouchers por tipo
        if (vouchersAlmoco !== null || vouchersJantar !== null || vouchersLanche !== null) {
            document.getElementById('vouchersPorTipo').classList.remove('d-none');
        }

        // Recalcula o total de vouchers disponiveis sempre que um voucher é resgatado
        //const totalDeVouchers = (vouchersAlmoco + vouchersJantar + vouchersLanche);
        const totalDeVouchersDisponiveis = (doc.data().qtde_vouchers_disponiveis - doc.data().qtde_vouchers_usado);

        document.getElementById("vouchersTotal").innerHTML = doc.data().qtde_vouchers;
        document.getElementById("vouchersAlmoco").innerHTML = vouchersAlmoco;
        document.getElementById("vouchersJantar").innerHTML = vouchersJantar;
        document.getElementById("vouchersKitLanche").innerHTML = vouchersLanche;
        document.getElementById("vouchersDisponiveis").innerHTML = totalDeVouchersDisponiveis;
        document.getElementById("vouchersResgatados").innerHTML = doc.data().qtde_vouchers_usado;
    }

    // Dados referentes à distribuição de Credenciais
    if (doc.id === "credencial") {
        document.getElementById("credenciaisTotal").innerHTML = doc.data().qtde_credenciais;
        document.getElementById("credenciaisEmUso").innerHTML = doc.data().qtde_credencial_usada;
        document.getElementById("credenciaisDisponiveis").innerHTML = doc.data().qtde_credencial_disponivel;
    }
});