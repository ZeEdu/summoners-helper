import { Component, Input, OnInit } from '@angular/core';
import { ItemArray } from 'src/app/interfaces/full-guide';
import { Item } from 'src/app/interfaces/items';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-items-roll',
  templateUrl: './items-roll.component.html',
  styleUrls: ['./items-roll.component.scss'],
})
export class ItemsRollComponent implements OnInit {
  @Input() rollName: string;
  @Input() itemArray: ItemArray[];

  public resUrl = environment.backendBaseUrl;

  constructor() {}

  ngOnInit() {}
}
