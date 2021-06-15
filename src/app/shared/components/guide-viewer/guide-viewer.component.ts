import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { FullGuide } from 'src/app/interfaces/full-guide';
import { ScreenSizeService } from 'src/app/services/screensize.service';

@Component({
  selector: 'app-guide-viewer',
  templateUrl: './guide-viewer.component.html',
  styleUrls: ['./guide-viewer.component.scss'],
})
export class GuideViewerComponent implements OnInit, AfterViewInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  @Input() guide: FullGuide;
  @Output() slideChangeEmitter = new EventEmitter<boolean>();

  public segment = 0;
  public selectedSlide: any;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    allowTouchMove: false,
    autoHeight: true,
  };

  public async segmentChanged(event: any) {
    await this.selectedSlide.slideTo(this.segment);
  }

  public async slideChanged(slides: IonSlides) {
    this.selectedSlide = slides;
    slides
      .getActiveIndex()
      .then((selectedIndex) => (this.segment = selectedIndex));

    this.slideChangeEmitter.emit(true);

    // this.content.scrollToTop(1);
  }

  calcHeight(): string {
    return `${window.innerHeight - 66}`;
  }

  handleSlideChange() {}

  constructor() {}
  async ngAfterViewInit(): Promise<void> {
    // this.slides.update();
    console.log(await this.slides.length());
  }

  ngOnInit() {
    this.calcHeight();
  }
}
