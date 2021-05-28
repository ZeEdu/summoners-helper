import { Component, Input, OnInit } from '@angular/core';
import { Guide } from 'src/app/interfaces/build';

@Component({
  selector: 'app-guide-viewer',
  templateUrl: './guide-viewer.component.html',
  styleUrls: ['./guide-viewer.component.scss'],
})
export class GuideViewerComponent implements OnInit {
  @Input() guide: Guide;
  @Input() guideCreatorUsername: string;

  slideOpts = {
    initialSlide: 0,
  };

  constructor() {}

  ngOnInit() {}
}
