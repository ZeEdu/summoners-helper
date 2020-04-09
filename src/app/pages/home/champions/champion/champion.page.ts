import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { GetChampionsService } from 'src/app/services/get-champions.service';
import { ActivatedRoute } from '@angular/router';
import { Champion, LoLResponse } from 'src/app/interfaces/champion-overview';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.page.html',
  styleUrls: ['./champion.page.scss'],
})
export class ChampionPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  constructor(
    private getChampion: GetChampionsService,
    private route: ActivatedRoute
  ) {}

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
    this.getChampion
      .getChampionByID(id)
      .subscribe(
        (response: LoLResponse) => (this.championData = response.data[id])
      );

    // this.getChampion.getChampionByID();
  }
  // TODO: get id from route
  // TODO: Create service to get champion

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
