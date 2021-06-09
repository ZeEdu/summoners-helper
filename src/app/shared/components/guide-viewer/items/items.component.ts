import { Component, Input, OnInit } from '@angular/core';
import { Items } from 'src/app/interfaces/full-guide';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  @Input() description: string;
  @Input() itemsBlock: Items[];

  constructor() {}

  ngOnInit() {}
}
