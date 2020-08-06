import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
   selector: 'app-recover-password',
   templateUrl: './recover-password.page.html',
   styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
   public email: FormControl;
   public loading: HTMLIonLoadingElement;

   constructor(
      private authService: AuthService,
      private fb: FormBuilder,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController
   ) {}

   ngOnInit() {
      this.email = this.fb.control('', [Validators.required, Validators.email]);
   }

   public async onSubmit(): Promise<void> {
      const userEmail = this.getEmail();
      await this.presentloading();
      try {
         await this.authService.recoverPassword(userEmail);
         this.presentToast('Link Enviado para o email');
      } catch (error) {
         this.presentToast(error.code);
      } finally {
         this.loading.dismiss();
      }
   }
   public async presentToast(message: string): Promise<void> {
      const toast = await this.toastCtrl.create({ message, duration: 3000 });
      await toast.present();
   }

   async presentloading() {
      this.loading = await this.loadingCtrl.create({
         message: 'Please, wait a moment...',
      });
      return this.loading.present();
   }
   getEmail(): string {
      return this.email.value;
   }

   public recover(): void {
      this.recoverPassword();
   }
   private recoverPassword() {
      return null;
   }
}
