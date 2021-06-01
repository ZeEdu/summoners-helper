import { Component, Input, OnInit } from '@angular/core';
import { ItemArray } from 'src/app/interfaces/build';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() src: string;
  @Input() name: string;
  @Input() description: string;

  constructor() {}

  ngOnInit() {}
}
