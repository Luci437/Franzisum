import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3_f9_NAXrSsu8qps100Kd0mblP00Imnw",
  authDomain: "franzisum-13c1b.firebaseapp.com",
  projectId: "franzisum-13c1b",
  storageBucket: "franzisum-13c1b.appspot.com",
  messagingSenderId: "782169885685",
  appId: "1:782169885685:web:3b2647af70833a6b9b2ebc",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
