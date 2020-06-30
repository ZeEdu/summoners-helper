import { Component, OnInit, ViewChild } from '@angular/core';
import { Builds, Id } from 'src/app/interfaces/get-builds';
import { BuildManagerService } from 'src/app/services/build-manager.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
   AlertController,
   IonInfiniteScroll,
   LoadingController,
   ToastController,
} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
   selector: 'app-builds',
   templateUrl: './builds.page.html',
   styleUrls: ['./builds.page.scss'],
})
export class BuildsPage implements OnInit {
   @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;

   page = 0;
   public userBuilds: Array<Builds> = [];
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
      this.loadGuides();
   }

   loadGuides(loadMore = false, event?) {
      if (loadMore) {
         this.page++;
      }

      this.afa.user.subscribe((user) => {
         user.getIdToken().then((token) => {
            this.buildService
               .getBuildByUserUID(user.uid, token, this.page)
               .subscribe(
                  (r: Array<Builds>) =>
                     (this.userBuilds = [...this.userBuilds, ...r])
               );
         });
      });

      if (event) {
         event.target.complete();
      }
   }

   private getAllBuilds(uid: string, token: string, page = 0) {
      this.page = page;
      this.buildService
         .getBuildByUserUID(uid, token, page)
         .subscribe((r: Array<Builds>) => (this.userBuilds = r));
   }

   async presentAlertConfirm(guideName: string, id: Id) {
      const alert = await this.alertController.create({
         cssClass: 'customAlert',
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
            (_) => {
               this.presentToast(
                  'Successfully deleted your build! Page will be reloaded'
               );
               this.reloadPage();
            },
            (err) => {
               this.presentToast(err.name);
            }
         );
         this.loading.dismiss();
      });
   }

   reloadPage() {
      setTimeout(() => {
         this.afa.user.subscribe((user) => {
            user.getIdToken().then((token) => {
               this.buildService
                  .getBuildByUserUID(user.uid, token, this.page)
                  .subscribe((r: Array<Builds>) => (this.userBuilds = r));
            });
         });
      }, 3000);
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
