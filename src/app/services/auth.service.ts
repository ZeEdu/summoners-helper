import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "../interfaces/user";
import { UserManagerService } from "./user-manager.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private afa: AngularFireAuth,
    private usrMnger: UserManagerService
  ) {}

  public user: User;

  login(user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  anonLogin() {
    return this.afa.auth.signInAnonymously();
  }

  register(user: User) {
    return this.afa.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  logout() {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;
  }
}
