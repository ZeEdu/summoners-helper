import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { Observable, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Component({
   selector: 'app-settings',
   templateUrl: './settings.page.html',
   styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
   public currentUser = { uid: '', username: '', email: '' };
   private userSubs = Subscription;

   constructor(
      private authService: AuthService,
      private afa: AngularFireAuth,
      private userManager: UserManagerService
   ) {}

   ngOnInit(): void {
      this.afa.user.subscribe((user: firebase.User) => {
         if (user) {
            this.currentUser.email = user.email;
            this.userManager
               .getUsernameByUID(user.uid)
               .subscribe((username: string) => {
                  if (username) {
                     this.currentUser.username = username;
                  }
               });
         }
      });
   }

   logout() {
      this.authService.logout();
   }
}
