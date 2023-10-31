// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { collection, getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOkw1MS120TxO0Sx20WldQfhxb-QU8HFE",
  authDomain: "financial-calendar-61056.firebaseapp.com",
  projectId: "financial-calendar-61056",
  storageBucket: "financial-calendar-61056.appspot.com",
  messagingSenderId: "645146622549",
  appId: "1:645146622549:web:d055f062da30171496f2dc",
  measurementId: "G-RCV48VV7X5",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
//export const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)

export const accountsCollection = collection(db, "accounts")
export const customersCollection = collection(db, "customers")
export const transactionsCollection = collection(db, "transactions")
