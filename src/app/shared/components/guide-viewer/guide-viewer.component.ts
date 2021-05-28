import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide-viewer',
  templateUrl: './guide-viewer.component.html',
  styleUrls: ['./guide-viewer.component.scss'],
})
export class GuideViewerComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
  };

  constructor() {}

  ngOnInit() {}
}
