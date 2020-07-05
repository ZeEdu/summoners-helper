import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Builds, Id } from 'src/app/interfaces/get-builds';
import { BuildManagerService } from 'src/app/services/build-manager.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
   AlertController,
   IonInfiniteScroll,
   LoadingController,
   ToastController,
} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { backendBaseUrl } from 'src/environments/environment';

@Component({
   selector: 'app-builds',
   templateUrl: './builds.page.html',
   styleUrls: ['./builds.page.scss'],
})
export class BuildsPage implements OnInit, OnDestroy {
   @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;

   page = 0;
   public userBuilds: Array<Builds> = [];
   loading: any;
   private userSubscription: Subscription;
   private getBuildSubscription: Subscription;
   firstLoad = true;
   public resUrl = backendBaseUrl;
   routeSubscription: Subscription;

   constructor(
      private buildService: BuildManagerService,
      private afa: AngularFireAuth,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private buildManager: BuildManagerService,
      public alertController: AlertController,
      public route: ActivatedRoute
   ) {}

   ngOnInit() {
      this.routeSubscription = this.route.params.subscribe((_) => {
         this.loadGuides();
      });
   }

   ngOnDestroy() {
      this.userSubscription.unsubscribe();
      this.getBuildSubscription.unsubscribe();
      this.routeSubscription.unsubscribe();
   }
   firstGuideLoad(): void {
      this.loadGuides();
   }

   loadGuides(loadMore = false, event?) {
      if (loadMore) {
         this.page++;
      }

      this.userSubscription = this.afa.user.subscribe((user) => {
         if (user) {
            user.getIdToken().then((token) => {
               this.getBuildSubscription = this.buildService
                  .getBuildByUserUID(user.uid, token, this.page)
                  .subscribe((r: Array<Builds>) => {
                     if (event) {
                        this.userBuilds = [...this.userBuilds, ...r];
                     } else {
                        this.userBuilds = r;
                     }
                  });
            });
         }
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
