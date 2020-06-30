import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonInfiniteScroll, IonSlides } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Champion, LoLResponse } from 'src/app/interfaces/champion-overview';
import { BuildManagerService } from 'src/app/services/build-manager.service';
import { Builds } from 'src/app/interfaces/get-builds';
import { DataDragonHandlerService } from 'src/app/services/data-dragon-handler.service';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
   selector: 'app-champion',
   templateUrl: './champion.page.html',
   styleUrls: ['./champion.page.scss'],
})
export class ChampionPage implements OnInit {
   @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;
   @ViewChild(IonSlides, { static: false }) slides: IonSlides;

   constructor(
      private buildService: BuildManagerService,
      private dDragonHandler: DataDragonHandlerService,
      private route: ActivatedRoute,
      public safeHtml: SafeHtmlPipe,
      private afa: AngularFireAuth
   ) {}

   page = 0;
   public builds: Array<Builds> = [];
   public championData: Champion;
   public segmentPosition = 0;
   public segment = 0;
   public selectedSlide: any;
   public sliderOptions = {
      initialSlide: 0,
      slidesPerView: 1,
      speed: 400,
   };

   ngOnInit() {
      const id = this.getChampionID();
      this.dDragonHandler
         .getChampionByID(id)
         .subscribe(
            (response: LoLResponse) => (this.championData = response.data[id])
         );

      this.loadGuides();
   }

   private getChampionID(): string {
      return this.route.snapshot.paramMap.get('id');
   }

   public async segmentChanged(event: any) {
      await this.selectedSlide.slideTo(this.segment);
   }

   public async slideChanged(slides: IonSlides) {
      this.selectedSlide = slides;
      slides
         .getActiveIndex()
         .then((selectedIndex) => (this.segment = selectedIndex));
   }

   public loadGuides(loadMore = false, event?) {
      if (loadMore) this.page++;

      this.afa.idToken.subscribe((token) => {
         this.buildService
            .getBuildByChampionID(this.getChampionID(), token, this.page)
            .subscribe(
               (response: Array<Builds>) =>
                  (this.builds = [...this.builds, ...response])
            );
      });

      if (event) {
         event.target.complete();
      }
   }
}
