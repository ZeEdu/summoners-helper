import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
   FormBuilder,
   FormControl,
   FormGroup,
   Validators,
} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';
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
         message: message,
         duration: 5000,
      });
      toast.present();
   }

   public checkValues(): void {
      console.log(this.changePasswordForm.controls['email'].value);
   }

   private getFormValues(): void {}

   private getEmail(): string {
      return this.changePasswordForm.controls.email.value;
   }

   private getCurrentPassword(): string {
      return this.changePasswordForm.controls.currentPassword.value;
   }

   private getPassword(): string {
      return this.changePasswordForm.controls.password.value;
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
         password: this.getPassword(),
      };
      try {
         await this.auth.login(user);
         return true;
      } catch (error) {
         this.submitErrors.push('Authentication error');
         return false;
      }
   }

   public async handleSubmit(): Promise<void> {
      // if ((await this.reauthenticateUser()) && this.validateEmail()) {
      //    this.auth
      //       .getUser()
      //       .pipe(take(1))
      //       .subscribe(async (User: firebase.User) => {
      //          try {
      //             await User.updatePassword(this.newPassword.password);
      //             this.presentToast('Password Updated Successfully');
      //          } catch (error) {
      //             this.submitErrors.push('Something went wrong');
      //          }
      //       });
      // }
   }

   ngOnInit() {
      this.createForm();
   }
}
