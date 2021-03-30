import { Component, OnInit, ViewChild } from '@angular/core';
import { DataDragonHandlerService } from 'src/app/services/data-dragon-handler.service';
import { Champion } from '../../../interfaces/champion-overview';
import { catchError, retry, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { ChampionHeader } from 'src/app/interfaces/champion-header';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.page.html',
  styleUrls: ['./champions.page.scss'],
})
export class ChampionsPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;
  public champions: Array<ChampionHeader>;
  public isLoading: boolean;
  public connectionFailed = false;
  public resUrl: string = environment.backendBaseUrl;
  public patchVersion: string = environment.patchVersion;
  page: number;

  constructor(private ddHandler: DataDragonHandlerService) {}

  public callLoadContent(event?: any) {
    if (event) {
      this.page++;
      this.loadContent(event);
    } else {
      this.loadContent();
    }
  }

  private loadContent(event?: any) {
    this.isLoading = true;
    this.ddHandler
      .getChampions(this.page)
      .pipe(
        retry(2),
        take(1),
        catchError((err) => {
          this.connectionFailed = true;
          this.isLoading = false;
          return throwError(err);
        })
      )
      .subscribe((champions: Array<ChampionHeader>) => {
        this.connectionFailed = false;
        this.isLoading = false;
        if (event) {
          this.champions = [...this.champions, ...champions];
        } else {
          this.champions = champions;
        }
      });
    if (event) {
      event.target.complete();
    }
  }

  ngOnInit() {
    this.page = 0;
    this.callLoadContent();
  }
}
