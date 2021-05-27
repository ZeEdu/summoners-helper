import { Component, Input, OnInit } from '@angular/core';
import { Stats } from 'src/app/interfaces/champion-overview';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  @Input() stats: Stats;
  constructor() {}

  ngOnInit() {}
}
