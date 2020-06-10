import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import {
   FormBuilder,
   FormControl,
   FormGroup,
   Validators,
} from '@angular/forms';
import { CustomAsyncValidators } from '../../validations/custom-async-validators';
import { CustomValidators } from '../../validations/custom-validators';
import { UserManagerService } from 'src/app/services/user-manager.service';

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
      private fb: FormBuilder,
      private asyncCustomValidator: CustomAsyncValidators,
      private userManager: UserManagerService
   ) {}

   public frmSignup: FormGroup;
   public userRegister: User = {};
   public usernameValue: string;

   public loading: any;

   public createForm() {
      this.frmSignup = this.fb.group(
         {
            username: new FormControl(
               '',
               [
                  Validators.required,
                  Validators.minLength(5),
                  Validators.maxLength(30),
                  CustomValidators.patternValidator(/^\S*$/, {
                     haswhitespaces: true,
                  }),
                  CustomValidators.patternValidator(/^[a-zA-Z0-9-_]+$/, {
                     alphanumeric: true,
                  }),
               ],
               [
                  this.asyncCustomValidator.asyncValidateUsername(
                     'isusernametaken'
                  ),
               ]
            ),
            email: new FormControl(
               '',
               [
                  Validators.required,
                  Validators.email,
                  CustomValidators.patternValidator(
                     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                     { invalidemailformat: true }
                  ),
               ],
               [this.asyncCustomValidator.asyncValidateEmail('isemailtaken')]
            ),
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

   ngOnInit() {
      this.createForm();
   }

   public onSubmit() {
      this.getFormValues();
      this.register();
   }

   // Get Form Values Methods

   private getFormValues(): void {
      this.userRegister.username = this.getUsername();
      this.userRegister.email = this.getEmail();
      this.userRegister.password = this.getPassword();
   }

   private getUsername(): string {
      return this.frmSignup.controls.username.value;
   }

   private getEmail(): string {
      return this.frmSignup.controls.email.value;
   }

   private getPassword(): string {
      return this.frmSignup.controls.username.value;
   }

   public async register() {
      // Checar se existe um  usuário com este nome
      await this.presentloading();

      try {
         // Registra o usuário no Sistema de Autenticação do Firebase
         const newUser = await this.authService.register(this.userRegister);

         // Atualiza
         this.userRegister.uid = newUser.user.uid;
         this.userManager.addUser(this.userRegister);

         // Registra o usuário no backend
         this.presentToast('Cadastrado com Sucesso!');
      } catch (error) {
         this.presentToast(error.code);
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
      const toast = await this.toastCtrl.create({ message, duration: 3000 });
      await toast.present();
   }
}
