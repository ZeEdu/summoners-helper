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

@Component({
  selector: 'app-guide-viewer',
  templateUrl: './guide-viewer.component.html',
  styleUrls: ['./guide-viewer.component.scss'],
})
export class GuideViewerComponent implements OnInit, AfterViewInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  @Input() guide: FullGuide;
  @Output() slideChangeEmitter = new EventEmitter<boolean>();

  slideOpts = {
    initialSlide: 0,
    autoHeight: true,

    createElements: true,
  };

  handleSlideChange() {
    this.slideChangeEmitter.emit(true);
  }

  constructor() {}
  ngAfterViewInit(): void {
    this.slides.update();
  }

  ngOnInit() {}
}
