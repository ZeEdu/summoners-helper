import { Component, Input, OnInit } from '@angular/core';
import { Passive, Spell } from 'src/app/interfaces/champion-overview';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss'],
})
export class AbilitiesComponent implements OnInit {
  @Input() passive: Passive;
  @Input() spells: Spell[];

  public resUrl = environment.backendBaseUrl;
  public patchVersion = environment.patchVersion;

  constructor() {}

  ngOnInit() {}
}
