import { Injectable } from '@angular/core';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyAPg1ulI5I5bSxezWv_8Mj5-jjLfFraYdA',
  authDomain: 'poshak-729a5.firebaseapp.com',
  databaseURL: 'https://poshak-729a5.firebaseio.com/',
  storageBucket: 'gs://poshak-729a5.appspot.com',
  messagingSenderId: "839504716567"
};

export const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
firebase.initializeApp(firebaseConfig);

@Injectable()
export class FirebaseAuthService {
  
  login(email, password): Promise<Object> {
  	return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  register(email, password): Promise<Object> {
  	return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
}
