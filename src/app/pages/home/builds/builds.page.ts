import { Component, OnInit } from '@angular/core';
import { Builds, Id } from 'src/app/interfaces/get-builds';
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
         user.getIdToken(true).then((token) => {
            this.getAllBuilds(user.uid, token);
         });
      });
   }

   private getAllBuilds(uid: string, token: string) {
      this.buildService
         .getBuildByUserUID(uid, token)
         .subscribe((r: Array<Builds>) => {
            this.userBuilds = r;
            console.log(r);
         });
   }

   async presentAlertConfirm(guideName: string, id: Id) {
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

   private async deleteGuide(id: Id) {
      await this.presentloading();

      this.afa.idToken.subscribe((token) => {
         this.buildManager.deleteByBuildId(id, token).subscribe(
            (res) => {
               this.presentToast('Successfully deleted your build!');
            },
            (err) => {
               this.presentToast(err.name);
            }
         );
         this.getAllBuilds(this.userUID, token);
      });
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
