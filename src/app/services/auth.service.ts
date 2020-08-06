import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { UserManagerService } from './user-manager.service';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   constructor(private afa: AngularFireAuth) {}

   public user: User;

   public login(user: User): Promise<firebase.auth.UserCredential> {
      return this.afa.auth.signInWithEmailAndPassword(
         user.email,
         user.password
      );
   }

   public anonLogin(): Promise<firebase.auth.UserCredential> {
      return this.afa.auth.signInAnonymously();
   }

   public register(user: User): Promise<firebase.auth.UserCredential> {
      return this.afa.auth.createUserWithEmailAndPassword(
         user.email,
         user.password
      );
   }

   public logout(): Promise<void> {
      return this.afa.auth.signOut();
   }

   public recoverPassword(email: string): Promise<void> {
      return this.afa.auth.sendPasswordResetEmail(email);
   }

   public getAuth() {
      return this.afa.auth;
   }
}
