import { Component, OnInit } from '@angular/core';
import { DataDragonHandlerService } from 'src/app/services/data-dragon-handler.service';
import { Champion, LoLResponse } from '../../../interfaces/champion-overview';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.page.html',
  styleUrls: ['./champions.page.scss']
})
export class ChampionsPage implements OnInit {
  constructor(private ddHandler: DataDragonHandlerService) {}

  public champions: Array<Champion> = [];

  ngOnInit() {
    this.ddHandler
      .getChampions()
      .subscribe(
        (response: any) => (this.champions = Object.values(response.data))
      );
  }
}
