import { Component, OnInit, ViewChild } from '@angular/core';
import { DataDragonHandlerService } from 'src/app/services/data-dragon-handler.service';
import { Champion } from '../../../interfaces/champion-overview';
import { catchError, retry, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { ChampionHeader } from 'src/app/interfaces/champion-header';
import { IonInfiniteScroll } from '@ionic/angular';
import { ChampionsService } from 'src/app/services/champions.service';
import { ChampionListItem } from 'src/app/interfaces/champion-list-item';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.page.html',
  styleUrls: ['./champions.page.scss'],
})
export class ChampionsPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;
  public championsObs: Observable<ChampionListItem[]>;
  public isLoading: boolean;

  public resUrl: string = environment.backendBaseUrl;
  public patchVersion: string = environment.patchVersion;

  constructor(private championService: ChampionsService) {}

  public loadContent() {
    this.isLoading = true;

    this.championsObs = this.championService.getChampionList();

    this.isLoading = false;
  }

  ngOnInit() {
    this.loadContent();
  }
}
