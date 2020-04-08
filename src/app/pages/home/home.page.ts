import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public currentUserEmail: any;

  ngOnInit(): void {
    this.afa.auth.onAuthStateChanged((user) => {
      this.currentUserEmail = user.email;
    });
  }

  constructor(private authService: AuthService, private afa: AngularFireAuth) {}

  logout() {
    this.authService.logout();
  }
}
