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
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Component({
   selector: 'app-builds',
   templateUrl: './builds.page.html',
   styleUrls: ['./builds.page.scss'],
})
export class BuildsPage implements OnInit, OnDestroy {
   @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;

   private page = 0;
   public userBuilds: Array<Builds>;
   private loading: any;
   private firstLoad = true;
   public resUrl = environment.backendBaseUrl;
   public patchVersion = environment.patchVersion;
   private routeSubs: Subscription;

   constructor(
      private buildService: BuildManagerService,
      private afa: AngularFireAuth,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private buildManager: BuildManagerService,
      public alertController: AlertController,
      public route: ActivatedRoute
   ) {}
   ngOnDestroy(): void {
      if (this.routeSubs) {
         this.routeSubs.unsubscribe();
      }
   }

   ngOnInit() {
      this.routeSubs = this.route.params.subscribe((_) => {
         this.loadGuides();
      });
   }

   firstGuideLoad(): void {
      this.loadGuides();
   }

   loadGuides(loadMore = false, event?) {
      if (loadMore) {
         this.page++;
      }

      this.afa.user.pipe(take(1)).subscribe((user) => {
         if (user) {
            user.getIdToken().then((token) => {
               this.buildService
                  .getBuildByUserUID(user.uid, token, this.page)
                  .pipe(take(1))
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

   //  private getAllBuilds(uid: string, token: string, page = 0) {
   //     this.page = page;
   //     this.buildService
   //        .getBuildByUserUID(uid, token, page)
   //        .pipe(take(1))
   //        .subscribe((r: Array<Builds>) => (this.userBuilds = r));
   //  }

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

      this.afa.idToken.pipe(take(1)).subscribe((token) => {
         this.buildManager
            .deleteByBuildId(id, token)
            .pipe(take(1))
            .subscribe(
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
         this.afa.user.pipe(take(1)).subscribe((user) => {
            user.getIdToken().then((token) => {
               this.buildService
                  .getBuildByUserUID(user.uid, token, this.page)
                  .pipe(take(1))
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
