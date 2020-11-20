import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { pipe } from 'rxjs';
import { retry, take } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidators } from 'src/app/validations/custom-validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  public submitErrors: Array<string> = [];
  public changePasswordForm: FormGroup;
  public isSubmitting = false;

  constructor(
    private auth: AuthService,
    public toastController: ToastController,
    private fb: FormBuilder
  ) {}

  public createForm() {
    this.changePasswordForm = this.fb.group(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          CustomValidators.patternValidator(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            { invalidemailformat: true }
          ),
        ]),
        currentPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: CustomValidators.passwordMatchingValidator,
      }
    );
  }

  private async presentToast(message: string) {
    const toast: HTMLIonToastElement = await this.toastController.create({
      message,
      duration: 5000,
    });
    toast.present();
  }

  private getEmail(): string {
    return this.changePasswordForm.controls.email.value;
  }

  private getCurrentPassword(): string {
    return this.changePasswordForm.controls.currentPassword.value;
  }

  private getPassword(): string {
    return this.changePasswordForm.controls.password.value;
  }

  clearForm(): void {
    this.changePasswordForm.controls.email.setValue('');
    this.changePasswordForm.controls.currentPassword.setValue('');
    this.changePasswordForm.controls.password.setValue('');
    this.changePasswordForm.controls.confirmPassword.setValue('');
  }

  private validateEmail(): boolean {
    if (this.auth.currentUser().email !== this.getEmail()) {
      this.submitErrors.push('Email inválido');
      return false;
    }
    return true;
  }

  private async reauthenticateUser(): Promise<boolean> {
    const user: User = {
      email: this.getEmail(),
      password: this.getCurrentPassword(),
    };
    try {
      await this.auth.login(user);
      return true;
    } catch (_) {
      this.submitErrors.push('Authentication error');
      return false;
    }
  }

  public async handleSubmit(): Promise<void> {
    this.isSubmitting = true;
    if ((await this.reauthenticateUser()) && this.validateEmail()) {
      this.auth
        .getUser()
        .pipe(retry(2), take(1))
        .subscribe(
          async (user: firebase.User) => {
            try {
              await user.updatePassword(this.getPassword());
              this.presentToast('Password Updated Successfully');
              this.clearForm();
            } catch (_) {
              this.submitErrors.push('Something went wrong');
            }
          },
          () => this.submitErrors.push('Something went wrong'),
          () => (this.isSubmitting = false)
        );
    }
  }

  ngOnInit() {
    this.createForm();
  }
}
