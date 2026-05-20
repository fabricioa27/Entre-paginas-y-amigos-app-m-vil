import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmAwUICtVmEFrLG2tpY8cWSpO7svjjg_o",
  authDomain: "entrepaginasyamigos.firebaseapp.com",
  projectId: "entrepaginasyamigos",
  storageBucket: "entrepaginasyamigos.firebasestorage.app",
  messagingSenderId: "185827395012",
  appId: "1:185827395012:web:e9dea54d8e9d124d95d091"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Authentication
export const auth = getAuth(app);

export default app;