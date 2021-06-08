import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ChampionHeader } from 'src/app/interfaces/champion-header';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-champion-item',
  templateUrl: './champion-item.component.html',
  styleUrls: ['./champion-item.component.scss'],
})
export class ChampionItemComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() title: string;
  @Input() image: string;

  public resUrl: string = environment.backendBaseUrl;
  public patchVersion: string = environment.patchVersion;

  constructor() {}

  ngOnInit() {}
}
