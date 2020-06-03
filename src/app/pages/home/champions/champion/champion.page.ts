import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Champion, LoLResponse } from 'src/app/interfaces/champion-overview';
import { BuildManagerService } from 'src/app/services/build-manager.service';
import { Builds } from 'src/app/interfaces/get-builds';
import { DataDragonHandlerService } from 'src/app/services/data-dragon-handler.service';

@Component({
   selector: 'app-champion',
   templateUrl: './champion.page.html',
   styleUrls: ['./champion.page.scss'],
})
export class ChampionPage implements OnInit {
   @ViewChild(IonSlides, { static: false }) slides: IonSlides;
   constructor(
      private buildService: BuildManagerService,
      private dDragonHandler: DataDragonHandlerService,
      private route: ActivatedRoute
   ) {}

   public builds: Array<Builds>;
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
      const id = this.route.snapshot.paramMap.get('id');
      this.dDragonHandler
         .getChampionByID(id)
         .subscribe(
            (response: LoLResponse) => (this.championData = response.data[id])
         );
      this.buildService
         .getBuildByChampionID(id)
         .subscribe((response: Array<Builds>) => (this.builds = response));
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
}
