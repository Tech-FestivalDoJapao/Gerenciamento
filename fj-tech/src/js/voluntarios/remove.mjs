// Initializa a integração com o Firebase
import { db } from "./../firebaseConfig.mjs";
import { doc, deleteDoc } from "firebase/firestore";


/**
 * TODO? Remove um voluntário da listagem de voluntários e do banco de dados Firebase
 * através do modal de confirmação de remoção
 */
await deleteDoc(doc(db, "voluntario", idVoluntarioRemocao));