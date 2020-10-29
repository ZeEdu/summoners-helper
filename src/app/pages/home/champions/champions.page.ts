import { Component, OnInit } from '@angular/core';
import { DataDragonHandlerService } from 'src/app/services/data-dragon-handler.service';
import { Champion } from '../../../interfaces/champion-overview';
import { catchError, retry, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

@Component({
   selector: 'app-champions',
   templateUrl: './champions.page.html',
   styleUrls: ['./champions.page.scss'],
})
export class ChampionsPage implements OnInit {
   public champions: Array<Champion>;
   public isLoading: boolean;
   public connectionFailed: boolean = false;
   public resUrl: string = environment.backendBaseUrl;
   public patchVersion: string = environment.patchVersion;

   constructor(private ddHandler: DataDragonHandlerService) {}

   public reloadContent() {
      this.loadContent();
   }

   private loadContent() {
      this.isLoading = true;
      this.ddHandler
         .getChampions()
         .pipe(
            retry(2),
            take(1),
            catchError((err) => {
               this.connectionFailed = true;
               this.isLoading = false;
               return throwError(err);
            })
         )
         .subscribe((response: any) => {
            this.connectionFailed = false;
            this.isLoading = false;
            this.champions = Object.values(response.data);
         });
   }

   ngOnInit() {
      this.loadContent();
   }
}
