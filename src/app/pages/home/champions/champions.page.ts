import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataDragonHandlerService } from 'src/app/services/data-dragon-handler.service';
import { Champion, LoLResponse } from '../../../interfaces/champion-overview';
import { Subscription } from 'rxjs';
import { backendBaseUrl } from '../../../../environments/environment';

@Component({
   selector: 'app-champions',
   templateUrl: './champions.page.html',
   styleUrls: ['./champions.page.scss'],
})
export class ChampionsPage implements OnInit, OnDestroy {
   public champions: Array<Champion> = [];
   private ddhandlerSubscription: Subscription;
   public resUrl = backendBaseUrl;

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
