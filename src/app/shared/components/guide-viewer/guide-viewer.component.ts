import {
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
export class GuideViewerComponent implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  @Input() guide: FullGuide;

  @Output() slideChangeEmitter = new EventEmitter<boolean>();

  slideOpts = {
    initialSlide: 0,
  };

  handleSlideChange() {
    this.slideChangeEmitter.emit(true);
  }

  constructor() {}

  ngOnInit() {}
}
