import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { Observable } from 'rxjs';

@Component({
   selector: 'app-settings',
   templateUrl: './settings.page.html',
   styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
   public profile: Observable<UserProfile>;
   public isPageLoading: boolean;

   constructor(
      private authService: AuthService,
      private afa: AngularFireAuth,
      private userManager: UserManagerService
   ) {}

   ngOnInit(): void {
      this.isPageLoading = true;
      this.afa.user.pipe(take(1)).subscribe((user: firebase.User) => {
         user.getIdToken().then((token: string) => {
            this.profile = this.userManager.getUserProfileByUID(
               user.uid,
               token
            );
            this.isPageLoading = false;
         });
      });
   }

   public logout() {
      this.authService.logout();
   }
}
