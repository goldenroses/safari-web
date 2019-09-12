import "firebase/storage";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBFkuH4DhCcSjzviGqlg_NhxVDipcXqqaY",
  authDomain: "safari-f1c17.firebaseapp.com",
  databaseURL: "https://safari-f1c17.firebaseio.com",
  projectId: "safari-f1c17",
  storageBucket: "safari-f1c17.appspot.com",
  messagingSenderId: "468326861290",
  appId: "1:468326861290:web:501003eaaa7d2160"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
