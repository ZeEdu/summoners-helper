import { Component, OnInit } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";
import { User } from "src/app/interfaces/user";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public userLogin: User = {};
  public loading: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async login() {
    await this.presentloading();

    try {
      await this.authService.login(this.userLogin);

      this.presentToast("Login Realizado com Sucesso!");
    } catch (error) {
      this.presentToast(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async loginAnon() {
    await this.presentloading();

    try {
      await this.authService.anonLogin();
      this.presentToast("Continuando como convidado!");
    } catch (error) {
      this.presentToast(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentloading() {
    this.loading = await this.loadingCtrl.create({
      message: "Por favor, aguarde..."
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
