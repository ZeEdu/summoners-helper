import { Component, OnInit } from '@angular/core';
import { Builds } from 'src/app/interfaces/get-builds';
import { BuildManagerService } from 'src/app/services/build-manager.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.page.html',
  styleUrls: ['./builds.page.scss'],
})
export class BuildsPage implements OnInit {
  public userBuilds: Array<Builds> = [];
  private userUID: string;
  loading: any;
  constructor(
    private buildService: BuildManagerService,
    private afa: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private buildManager: BuildManagerService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.afa.user.subscribe((user) => {
      if (!user.isAnonymous) {
        this.userUID = user.uid;
        this.getAllBuilds(this.userUID);
      }
    });
  }

  private getAllBuilds(uid: string) {
    this.buildService
      .getBuildByUserUID(uid)
      .subscribe((response: Array<Builds>) => (this.userBuilds = response));
  }

  async presentAlertConfirm(guideName: string, id: string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Delete: ' + guideName,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deleteGuide(id);
          },
        },
      ],
    });
    await alert.present();
  }

  private async deleteGuide(id: string) {
    await this.presentloading();
    this.buildManager.deleteByBuildId(id).subscribe(
      (res) => {
        this.presentToast('Successfully deleted your build!');
      },
      (err) => {
        this.presentToast(err.name);
      }
    );
    this.loading.dismiss();
    this.getAllBuilds(this.userUID);
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
