import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router
  ) { }

  public userLogin: User = {};
  public userRegister: User = {};
  public loading: any;

  ngOnInit() { }

  async register() {
    await this.presentloading();

    try {

      await this.authService.register(this.userRegister);
      this.presentToast('Cadastrado com Sucesso!');

    } catch (error) {

      const errorMessage = this.setErrorMessage(error.code);
      console.log(errorMessage);
      this.presentToast(errorMessage);

    } finally {

      this.loading.dismiss();

    }

    this.router.navigate(['/login']);

  }

  async presentloading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...',
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
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
    }
    return errorMessage;
  }

}
