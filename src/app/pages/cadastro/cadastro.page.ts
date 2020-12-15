import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { AngularFireAuth } from '@angular/fire/auth';
import { takeUntil, take, retry, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  public frmSignup: FormGroup;
  public userRegister: User = {};
  public usernameValue: string;
  public loading: any;
  protected registerOn: boolean;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private afa: AngularFireAuth,
    private fb: FormBuilder,
    private asyncCustomValidator: CustomAsyncValidators,
    private userManager: UserManagerService
  ) {}

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
          [this.asyncCustomValidator.asyncValidateUsername('isusernametaken')]
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
    return this.frmSignup.controls.password.value;
  }

  public async register() {
    await this.presentloading();
    this.registerOn = true;
    try {
      const newUser = await this.authService.register(this.userRegister);
      this.userRegister.uid = newUser.user.uid;

      this.afa.idToken.pipe(retry(2), take(1)).subscribe((token) => {
        this.userManager
          .createUserProfile(this.userRegister, token)
          .pipe(take(1))
          .subscribe(
            (_) => {
              this.presentToast('Account created successfully!');
            },
            (err) => {
              this.presentToast(err);
            }
          );
      });
    } catch (error) {
      this.presentToast(error.code);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentloading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please, wait a moment...',
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
    await toast.present();
  }
}
