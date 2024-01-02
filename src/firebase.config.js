// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjct_cua_yLit75VUHZnPkHitRYgd_vYs",
    authDomain: "email-pass-auth-905e3.firebaseapp.com",
    projectId: "email-pass-auth-905e3",
    storageBucket: "email-pass-auth-905e3.appspot.com",
    messagingSenderId: "827107353552",
    appId: "1:827107353552:web:75e168c559a3d022214fd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;