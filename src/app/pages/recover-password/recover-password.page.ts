import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { HandleErrors } from 'src/app/models/handle-errors';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
  public email: FormControl;
  public loading: HTMLIonLoadingElement;
  public isLoading: boolean;
  public isEmailSent: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.email = this.fb.control('', [Validators.required, Validators.email]);
  }

  public async onSubmit(): Promise<void> {
    this.isLoading = true;
    const userEmail = this.getEmail();
    await this.presentloading();
    try {
      await this.authService.recoverPassword(userEmail);
      this.isEmailSent = true;
      this.presentToast(
        `A email has been sent to ${userEmail}. In a few minutes it will reach to your inbox.`
      );
    } catch (error) {
      this.presentToast('Something went wrong');
    } finally {
      this.loading.dismiss();
    }
  }
  public redirect() {
    this.router.navigate(['/login']);
  }
  public async presentToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({ message, duration: 10000 });
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
}
