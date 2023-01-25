import {initializeApp} from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs
} from 'firebase/firestore'
import "./index.css"


const firebaseConfig = {
    apiKey: "AIzaSyBfov3VF_pR4J-9-kypPWTRb4mCEsThGaA",
    authDomain: "contact-8a1b2.firebaseapp.com",
    projectId: "contact-8a1b2",
    storageBucket: "contact-8a1b2.appspot.com",
    messagingSenderId: "134623457144",
    appId: "1:134623457144:web:52b071dc99dec7d6ede28d",
    measurementId: "G-KCR7H2L9N5"
  };

  initializeApp(firebaseConfig)

  const db = getFirestore()

  const colRef = collection(db, 'contact')

  getDocs(colRef)
  .then((snapshot) =>{
    console.log(snapshot.docs)
  })


  //adding contact
  const addContact = document.querySelectorAll





  //deleting contact