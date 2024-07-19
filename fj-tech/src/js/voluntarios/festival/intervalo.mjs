// Initializa a integração com o Firebase
import { db } from "./../../firebaseConfig.mjs";
import { doc, getDoc } from "firebase/firestore";

import './../lista.mjs';

/**
 * TODO: Valida as informações de início e término do intervalo baseado no turno do voluntário
 */