import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

import {
  getFirestore
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZJoSnJrxBiRybVAIwwhmvKpBaTCoaRwY",
  authDomain: "entre-paginas-y-amigos.firebaseapp.com",
  projectId: "entre-paginas-y-amigos",
  storageBucket: "entre-paginas-y-amigos.firebasestorage.app",
  messagingSenderId: "510274526170",
  appId: "1:510274526170:web:2c6f786ff9d85155293ee3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider =
  new GoogleAuthProvider();

export const db =
  getFirestore(app);