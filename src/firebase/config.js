// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtGVHGnMQwzpJuczT_ssJE78THOkEqCSQ",
    authDomain: "shoplist-ab9dc.firebaseapp.com",
    databaseURL: "https://shoplist-ab9dc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "shoplist-ab9dc",
    storageBucket: "shoplist-ab9dc.appspot.com",
    messagingSenderId: "260411602919",
    appId: "1:260411602919:web:ff2f213f71c7ac07216f42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
// export const addItemTodb = ref(database, 'cartItems');
export const cartAuth = getAuth(app);
