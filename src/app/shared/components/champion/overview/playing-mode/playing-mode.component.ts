import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playing-mode',
  templateUrl: './playing-mode.component.html',
  styleUrls: ['./playing-mode.component.scss'],
})
export class PlayingModeComponent implements OnInit {
  @Input() mode: 'With' | 'Against';
  @Input() name: string;
  @Input() tips: string[];
  constructor() {}

  ngOnInit() {}
}
