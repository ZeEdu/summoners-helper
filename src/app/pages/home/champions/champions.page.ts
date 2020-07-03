import { Component, OnInit } from '@angular/core';
import { DataDragonHandlerService } from 'src/app/services/data-dragon-handler.service';
import { Champion, LoLResponse } from '../../../interfaces/champion-overview';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-champions',
   templateUrl: './champions.page.html',
   styleUrls: ['./champions.page.scss'],
})
export class ChampionsPage implements OnInit {
   public champions: Array<Champion> = [];
   private ddhandlerSubscription: Subscription;

   constructor(private ddHandler: DataDragonHandlerService) {}

   ngOnInit() {
      this.ddhandlerSubscription = this.ddHandler
         .getChampions()
         .subscribe(
            (response: any) => (this.champions = Object.values(response.data))
         );
   }

   ngOnDestroy() {
      this.ddhandlerSubscription.unsubscribe();
   }
}
