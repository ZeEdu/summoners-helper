import { Component, Input, OnInit } from '@angular/core';
import { Spell } from 'src/app/interfaces/spells';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss'],
})
export class SpellsComponent implements OnInit {
  @Input() description: string;
  @Input() firstSpell: Spell;
  @Input() secondSpell: Spell;

  public resUrl = environment.backendBaseUrl;

  constructor() {}

  ngOnInit() {}
}
