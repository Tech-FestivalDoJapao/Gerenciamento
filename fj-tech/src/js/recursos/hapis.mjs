// Initializa a integração com o Firebase
import { db } from "../firebaseConfig.mjs";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

/**
 * TODO: Identificar quantidade cadastrada de hapis
 */
const queryRecursos = query(collection(db, "recursos"));
const querySnapshot = await getDocs(queryRecursos);

/**
 * TODO: Calcular quantidade de hapis disponível para distribuição por tamanho
 */

/**
 * TODO: Calcular quantidade de hapis que já foi distribuída  por tamanho
 */