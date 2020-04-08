import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.page.html',
  styleUrls: ['./champion.page.scss'],
})
export class ChampionPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  constructor() {}

  public segmentPosition = 0;
  public segment = 0;
  public selectedSlide: any;
  public sliderOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
  };

  ngOnInit() {}
  // TODO: get id from route
  // TODO: Create service to get champion

  public async segmentChanged(event: any) {
    await this.selectedSlide.slideTo(this.segment);
  }
  public async slideChanged(slides: IonSlides) {
    this.selectedSlide = slides;
    slides.getActiveIndex().then((selectedIndex) => {
      this.segment = selectedIndex;
    });
  }
}
