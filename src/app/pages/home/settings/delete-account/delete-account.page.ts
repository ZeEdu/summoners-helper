import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { AuthService } from 'src/app/services/auth.service';
import { UserManagerService } from 'src/app/services/user-manager.service';

@Component({
   selector: 'app-delete-account',
   templateUrl: './delete-account.page.html',
   styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {
   public profile: UserProfile;
   public userData = {
      username: '',
      email: '',
   };

   protected isPageLoading: boolean;

   constructor(
      private authService: AuthService,
      private afa: AngularFireAuth,
      private userManager: UserManagerService,
      private toastController: ToastController,
      private alertController: AlertController
   ) {}

   async presentAlertConfirm() {
      const alert = await this.alertController.create({
         header: 'Confirm!',
         message:
            'Do you really want to <strong>DELETE</strong> your account!!!',
         buttons: [
            {
               text: 'Cancel',
               role: 'cancel',
               cssClass: 'secondary',
               handler: () => {
                  console.log('Confirm Cancel: blah');
               },
            },
            {
               text: 'Okay',
               cssClass: 'danger',
               handler: () => {
                  console.log('Confirm Okay');
               },
            },
         ],
      });

      await alert.present();
   }

   public handleSubmit() {
      if (
         this.userData.email === this.profile.email &&
         this.userData.username === this.profile.username
      ) {
         this.presentAlertConfirm();
      }
   }

   ngOnInit() {
      this.isPageLoading = true;
      this.afa.user.pipe(take(1)).subscribe((user: firebase.User) => {
         user.getIdToken().then((token: string) => {
            this.userManager
               .getUserProfileByUID(user.uid, token)
               .pipe(take(1))
               .subscribe((r: UserProfile) => (this.profile = r));
            this.isPageLoading = false;
         });
      });
   }
}
