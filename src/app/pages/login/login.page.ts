import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-login',
   templateUrl: './login.page.html',
   styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
   public userLogin: User = {};
   public loading: any;

   constructor(
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private authService: AuthService,
      private router: Router,
   ) { }

   ngOnInit() { }

   async login() {
      await this.presentloading();

      try {
         await this.authService.login(this.userLogin);
         this.presentToast('Login Realizado com Sucesso!');
      } catch (error) {
         const errorMessage = this.setErrorMessage(error.code);
         console.log(error);
         this.presentToast(errorMessage);
      } finally {
         this.loading.dismiss();
      }

   }


   async presentloading() {
      this.loading = await this.loadingCtrl.create({
         message: 'Por favor, aguarde...',
      });
      return this.loading.present();
   }

   async presentToast(message: string) {
      const toast = await this.toastCtrl.create({ message, duration: 2000 });
      toast.present();
   }

   setErrorMessage(errorCode: string) {
      let errorMessage: string;
      switch (errorCode) {
         case 'auth/argument-error':
            errorMessage = 'Email ou senha informados são inválidos!';
            break;
         case 'auth/weak-password':
            errorMessage = 'Senha deve possuir 6 caracteres ou mais!';
            break;
         case 'auth/email-already-in-use':
            errorMessage = 'O Email informado já está em uso!';
            break;
         case 'auth/user-not-found':
            errorMessage = 'Usuário não encontrado';
            break;
      }
      return errorMessage;
   }
}
