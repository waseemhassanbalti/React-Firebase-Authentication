import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
//import config from "./config";



const config = {
  apiKey: "AIzaSyDx92xTnNOWgH3wxbbH9_7srrZt8O7KG9Q",
  authDomain: "risingsundb-110.firebaseapp.com",
  databaseURL: "https://risingsundb-110.firebaseio.com",
  projectId: "risingsundb-110",
  storageBucket: "risingsundb-110.appspot.com",
  messagingSenderId: "593916236287"
};

class Firebase{
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }
    
     // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

    // *** User API ***
 
  user = uid => this.db.ref(`users/${uid}`);
 
  users = () => this.db.ref('users');

}
export default Firebase;
