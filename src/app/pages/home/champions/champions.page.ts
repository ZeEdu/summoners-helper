import { Component, OnInit } from '@angular/core';
import { DataDragonHandlerService } from 'src/app/services/data-dragon-handler.service';
import { Champion } from '../../../interfaces/champion-overview';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
   selector: 'app-champions',
   templateUrl: './champions.page.html',
   styleUrls: ['./champions.page.scss'],
})
export class ChampionsPage implements OnInit {
   public champions: Array<Champion> = [];
   public resUrl = environment.backendBaseUrl;
   public patchVersion = environment.patchVersion;
   constructor(private ddHandler: DataDragonHandlerService) {}

   ngOnInit() {
      this.ddHandler
         .getChampions()
         .pipe(take(1))
         .subscribe(
            (response: any) => (this.champions = Object.values(response.data))
         );
   }
}
