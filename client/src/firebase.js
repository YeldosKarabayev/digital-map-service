import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';



const firebaseConfig = {
    apiKey: "AIzaSyBbUfZOK-rnXOMfZ9gBFvD8KRqNn-QWai4",
    authDomain: "netflix-clone-yt-e7539.firebaseapp.com",
    projectId: "netflix-clone-yt-e7539",
    storageBucket: "netflix-clone-yt-e7539.appspot.com",
    messagingSenderId: "306530957499",
    appId: "1:306530957499:web:7e330a3e003f35e968519e"
  };
  

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth };
  export default db;