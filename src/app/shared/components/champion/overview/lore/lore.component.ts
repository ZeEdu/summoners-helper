import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lore',
  templateUrl: './lore.component.html',
  styleUrls: ['./lore.component.scss'],
})
export class LoreComponent implements OnInit {
  @Input() lore: string;
  constructor() {}

  ngOnInit() {}
}
