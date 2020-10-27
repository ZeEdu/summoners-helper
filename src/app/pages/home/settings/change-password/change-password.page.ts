import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
   selector: 'app-change-password',
   templateUrl: './change-password.page.html',
   styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
   public user: User = { email: '', password: '' };
   public newPassword = {
      password: '',
      checkPassword: '',
   };

   public submitErrors: Array<string> = [];

   constructor(
      private auth: AuthService,
      public toastController: ToastController
   ) {}

   private async presentToast(message: string) {
      const toast: HTMLIonToastElement = await this.toastController.create({
         message: message,
         duration: 5000,
      });
      toast.present();
   }

   private validateForm(): boolean {
      const currentUser = this.auth.currentUser();

      if (currentUser.email !== this.user.email) {
         this.submitErrors.push('Email inválido');
         return false;
      }

      if (this.newPassword.password !== this.newPassword.checkPassword) {
         this.submitErrors.push('Passwords do not match');
         return false;
      }

      if (
         this.newPassword.password.length < 6 ||
         this.newPassword.password.length > 30
      ) {
         this.submitErrors.push(
            'Password should be at least 6 and less than 30 characters'
         );
         return false;
      }
      return true;
   }

   private async reauthenticateUser(): Promise<boolean> {
      let credential: firebase.auth.UserCredential;

      try {
         credential = await this.auth.login(this.user);
         return true;
      } catch (error) {
         this.submitErrors.push('Authentication error');
         return false;
      }
   }

   public async handleSubmit(): Promise<void> {
      if ((await this.reauthenticateUser()) && this.validateForm()) {
         this.auth
            .getUser()
            .pipe(take(1))
            .subscribe(async (User: firebase.User) => {
               try {
                  await User.updatePassword(this.newPassword.password);
                  this.presentToast('Password Updated Successfully');
               } catch (error) {
                  this.submitErrors.push('Something went wrong');
               }
            });
      }
   }

   ngOnInit() {}
}
