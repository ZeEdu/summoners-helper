import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { UserManagerService } from './user-manager.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  public user: User;

  public currentUser(): firebase.User {
    return this.getAuth().currentUser;
  }

  public login(user: User): Promise<firebase.auth.UserCredential> {
    return this.getAuth().signInWithEmailAndPassword(user.email, user.password);
  }

  public anonLogin(): Promise<firebase.auth.UserCredential> {
    return this.getAuth().signInAnonymously();
  }

  public register(user: User): Promise<firebase.auth.UserCredential> {
    return this.getAuth().createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  public logout(): Promise<void> {
    return this.getAuth().signOut();
  }

  public recoverPassword(email: string): Promise<void> {
    return this.getAuth().sendPasswordResetEmail(email);
  }

  public getAuth() {
    return this.auth.auth;
  }

  public getAuthState() {
    return this.auth.authState;
  }
  public getUser() {
    return this.auth.user;
  }
}
