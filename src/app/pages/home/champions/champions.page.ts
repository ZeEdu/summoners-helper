import { Component, OnInit } from '@angular/core';
import { GetChampionsService } from 'src/app/services/get-champions.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.page.html',
  styleUrls: ['./champions.page.scss'],
})
export class ChampionsPage implements OnInit {
  constructor(private championsService: GetChampionsService) {}

  public champions: any = [];

  ngOnInit() {
    this.championsService
      .getChampions()
      .subscribe(
        (respose: any) => (this.champions = Object.values(respose.data))
      );
  }
}
