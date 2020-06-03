import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
   selector: 'app-settings',
   templateUrl: './settings.page.html',
   styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
   public currentUserEmail: any;
   public currentUser = { uid: '', username: '', email: '' };

   ngOnInit(): void {
      this.afa.user.subscribe((user) => {
         this.currentUser.uid = user.uid;
         this.currentUser.email = user.email;
      });
      this.afa.auth.onAuthStateChanged((user) => {
         this.currentUserEmail = user.email;
      });
   }

   constructor(
      private authService: AuthService,
      private afa: AngularFireAuth
   ) {}

   logout() {
      this.authService.logout();
   }
}
