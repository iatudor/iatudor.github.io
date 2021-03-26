import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  login(): Promise<firebase.auth.UserCredential> {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    return this.fireAuth.signInWithPopup(provider);
  }

  logout(): Promise<void> {
    return this.fireAuth.signOut();
  }
  
  get user(): any {
    return this.fireAuth.user;
  }

}
