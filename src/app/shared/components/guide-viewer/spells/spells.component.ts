import { Component, Input, OnInit } from '@angular/core';
import { Spells } from 'src/app/interfaces/full-guide';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss'],
})
export class SpellsComponent implements OnInit {
  @Input() description: string;
  @Input() spells: Spells;

  public resUrl = environment.backendBaseUrl;

  constructor() {}

  ngOnInit() {}
}
