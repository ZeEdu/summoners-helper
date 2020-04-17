import { Component, OnInit } from '@angular/core';
import { DataDragonHandlerService } from 'src/app/services/data-dragon-handler.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.page.html',
  styleUrls: ['./champions.page.scss'],
})
export class ChampionsPage implements OnInit {
  constructor(private dDragonhandler: DataDragonHandlerService) {}

  public champions: any = [];

  ngOnInit() {
    this.dDragonhandler
      .getChampions()
      .subscribe(
        (respose: any) => (this.champions = Object.values(respose.data))
      );
  }
}
