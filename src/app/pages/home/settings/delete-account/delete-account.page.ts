import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { retry, take } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { AuthService } from 'src/app/services/auth.service';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { CustomValidators } from 'src/app/validations/custom-validators';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {
  public profile: UserProfile;
  public userData = {
    username: '',
    email: '',
  };

  protected isLoading: boolean;
  public form: FormGroup;
  public errors = [];

  constructor(
    private auth: AuthService,
    private afa: AngularFireAuth,
    private userManager: UserManagerService,
    private toastController: ToastController,
    private alertController: AlertController,
    private fb: FormBuilder
  ) {}

  async confirmAccountDeletion() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do you really want to <strong>DELETE</strong> your account!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Okay',
          cssClass: 'danger',
          handler: () => {
            this.deleteAccount();
          },
        },
      ],
    });

    await alert.present();
  }

  private deleteAccount() {
    console.log('Account Deleted');
  }

  private async reauthenticateUser(user: User): Promise<boolean> {
    try {
      await this.auth.login(user);
      return true;
    } catch (_) {
      console.log('Authentication error');
      this.errors.push('Authentication error');
      return false;
    }
  }

  public handleSubmit() {
    this.isLoading = true;

    const user: User = {
      username: this.getUsername(),
      email: this.getEmail(),
      password: this.getPassword(),
    };

    this.afa.user
      .pipe(retry(2), take(1))
      .subscribe((currentUser: firebase.User) => {
        currentUser.getIdToken().then((token: string) => {
          this.userManager
            .getUserProfileByUID(currentUser.uid, token)
            .pipe(take(1))
            .subscribe(async (r: UserProfile) => {
              const currentUserData = r;
              let reauthResponse: boolean;

              if (
                currentUserData.email === user.email &&
                currentUserData.username === user.username
              ) {
                reauthResponse = await this.reauthenticateUser(user);
              } else {
                this.errors.push('User data do not match');
              }

              if (reauthResponse === true) {
                this.confirmAccountDeletion();
              } else {
                this.errors.push('Authentication failed');
              }

              this.isLoading = false;
            });
        });
      });

    // let response: boolean;

    // if (
    //   currentUserData.email === user.email &&
    //   currentUserData.username === user.username
    // ) {
    //   response = await this.reauthenticateUser(user.email, user.password);
    // }

    // if (response === true) {
    //   this.presentAlertConfirm();
    // }
  }

  ngOnInit() {
    this.createForm();
  }

  public createForm(): void {
    this.form = this.fb.group({
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  private getEmail(): string {
    return this.form.controls.email.value;
  }

  private getUsername(): string {
    return this.form.controls.username.value;
  }

  private getPassword(): string {
    return this.form.controls.password.value;
  }

  clearForm(): void {
    this.form.controls.email.setValue('');
    this.form.controls.username.setValue('');
    this.form.controls.password.setValue('');
  }
}
