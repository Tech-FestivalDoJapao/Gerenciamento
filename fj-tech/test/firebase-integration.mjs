// 
import { db } from "../src/js/firebaseConfig.mjs";
import { collection, query, where, getDocs } from "firebase/firestore";

const q = query(collection(db, "voluntario"), where("nome_completo_voluntario", "!=", null));
const querySnapshot = await getDocs(q);

querySnapshot.forEach((doc) => {
    console.log(doc.data().nome_completo_voluntario);
});