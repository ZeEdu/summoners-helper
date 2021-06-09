import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Champion } from 'src/app/interfaces/champion-overview';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  @Input() data: Champion;

  constructor() {}

  ngOnInit() {}
}
