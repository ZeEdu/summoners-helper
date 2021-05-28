import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent implements OnInit {
  @Input() name: string;
  @Input() champion: string;
  @Input() role: string;
  @Input() patch: string;
  @Input() introduction: string;
  @Input() updatedOn?: string;
  @Input() createdOn: string;
  @Input() creatorUsername?: string;

  constructor() {}

  ngOnInit() {}
}
