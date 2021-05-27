import { Component, Input, OnInit } from '@angular/core';
import { Info } from 'src/app/interfaces/champion-overview';

@Component({
  selector: 'app-basic-stats',
  templateUrl: './basic-stats.component.html',
  styleUrls: ['./basic-stats.component.scss'],
})
export class BasicStatsComponent implements OnInit {
  @Input() info: Info;

  constructor() {}

  ngOnInit() {}
}
