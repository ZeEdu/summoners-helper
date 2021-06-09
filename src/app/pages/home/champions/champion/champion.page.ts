import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonSlides } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Champion } from 'src/app/interfaces/champion-overview';
import { BuildManagerService } from 'src/app/services/build-manager.service';
import { Builds } from 'src/app/interfaces/get-builds';

import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { retry, take } from 'rxjs/operators';

import { ChampionsService } from 'src/app/services/champions.service';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.page.html',
  styleUrls: ['./champion.page.scss'],
})
export class ChampionPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infinite: IonInfiniteScroll;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  page = 0;
  public builds: Array<Builds> = [];
  public champion: Champion;
  public loading: boolean;

  public segmentPosition = 0;
  public segment = 0;
  public selectedSlide: any;
  public sliderOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
    autoHeight: true,
  };
  public resUrl = environment.backendBaseUrl;
  public patchVersion = environment.patchVersion;

  constructor(
    private buildService: BuildManagerService,
    private route: ActivatedRoute,
    public safeHtml: SafeHtmlPipe,
    private afa: AngularFireAuth,
    private championService: ChampionsService
  ) {}

  ngOnInit() {
    const id = this.getChampionID();
    this.loading = true;
    this.championService
      .getChampion(id)
      .pipe(take(1), retry(2))
      .subscribe((champion) => (this.champion = champion));

    this.loadGuides();
  }

  public getChampionID(): string {
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

    this.content.scrollToTop(1);
  }

  public loadGuides(loadMore = false, event?) {
    if (loadMore) this.page++;
    this.afa.idToken.subscribe((token) => {
      if (token) {
        this.buildService
          .getBuildByChampionID(this.getChampionID(), token, this.page)
          .pipe(take(1))
          .subscribe((response: Array<Builds>) => {
            this.builds = [...this.builds, ...response];
            if (this.loading) this.loading = false;
          });
      }
    });

    if (event) {
      event.target.complete();
    }
  }
}
