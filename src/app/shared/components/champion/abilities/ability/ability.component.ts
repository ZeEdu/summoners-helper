import { Component, Input, OnInit } from '@angular/core';
import { Spell } from 'src/app/interfaces/champion-overview';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.scss'],
})
export class AbilityComponent implements OnInit {
  @Input() spell: Spell;

  public resUrl = environment.backendBaseUrl;
  public patchVersion = environment.patchVersion;

  constructor() {}

  ngOnInit() {}
}
