import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

// const firebaseConfigTesting = {
//     apiKey: "AIzaSyCnKxlTQsVFoUXp3mDa1R_fyd1vulYOpck",
//     authDomain: "rv-react-app-course-testing.firebaseapp.com",
//     projectId: "rv-react-app-course-testing",
//     storageBucket: "rv-react-app-course-testing.appspot.com",
//     messagingSenderId: "48638433915",
//     appId: "1:48638433915:web:cf1077e006d0125baee0de"
// };

// if(process.env.NODE_ENV === 'test'){
//     // testing

//     // base de datos
//     firebase.initializeApp(firebaseConfigTesting);
   
// } else {
//     // dev/prod

//     // base de datos
//     firebase.initializeApp(firebaseConfig);

// }

// base de datos
firebase.initializeApp(firebaseConfig);

// referencia a firestore
const db = firebase.firestore();
// AuthProvider para hacer autenticacion con google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}