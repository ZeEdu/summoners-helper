import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  public user: User;

  login(user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  // async register(user: User) {
  //   try {
  //     const newUser = await this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  //     await this.afs.collection('Users').doc(newUser.user.uid).set(this.user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  register(user: User) {
    this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;
  }

}
