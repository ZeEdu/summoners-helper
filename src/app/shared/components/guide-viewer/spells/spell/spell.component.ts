import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.scss'],
})
export class SpellComponent implements OnInit {
  @Input() name: string;
  @Input() src: string;
  @Input() description: string;

  constructor() {}

  ngOnInit() {}
}
