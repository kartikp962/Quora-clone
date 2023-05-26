// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from 'firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBDQADimg-OTAjroClN7gtAZErBVylCnlw",
    authDomain: "quora-clone-4c168.firebaseapp.com",
    projectId: "quora-clone-4c168",
    storageBucket: "quora-clone-4c168.appspot.com",
    messagingSenderId: "823437047796",
    appId: "1:823437047796:web:32bd36401763bac77d6ba1",
    measurementId: "G-404CJ9WYWH"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  const db = firebaseApp.firestore()

  export {auth, provider}
  export default db