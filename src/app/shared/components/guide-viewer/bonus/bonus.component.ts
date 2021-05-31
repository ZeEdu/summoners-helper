import { Component, Input, OnInit } from '@angular/core';
import { Bonus } from 'src/app/interfaces/build';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss'],
})
export class BonusComponent implements OnInit {
  @Input() bonus: Bonus;
  @Input() description: string;

  public resUrl = environment.backendBaseUrl;
  public bonusBase = {
    first: {
      AdaptiveForce: {
        name: '9 Adaptive',
        ArrayKey: 'AdaptiveForce',
        icon: 'StatModsAdaptiveForceIcon.png',
      },
      AttackSpeed: {
        name: '10% Attack Speed',
        ArrayKey: 'AttackSpeed',
        icon: 'StatModsAttackSpeedIcon.png',
      },
      CDRScaling: {
        name: '1-10% CDR',
        ArrayKey: 'CDRScaling',
        icon: 'StatModsCDRScalingIcon.png',
      },
    },
    second: {
      AdaptiveForce: {
        name: '9 Adaptive',
        ArrayKey: 'AdaptiveForce',
        icon: 'StatModsAdaptiveForceIcon.png',
      },
      Armor: {
        name: '6 Armor',
        ArrayKey: 'Armor',
        icon: 'StatModsArmorIcon.png',
      },
      MagicRes: {
        name: '8 Magic Resist',
        ArrayKey: 'MagicRes',
        icon: 'StatModsMagicResIcon.png',
      },
    },
    third: {
      Armor: {
        name: '6 Armor',
        ArrayKey: 'Armor',
        icon: 'StatModsArmorIcon.png',
      },
      MagicRes: {
        name: '8 Magic Resist',
        ArrayKey: 'MagicRes',
        icon: 'StatModsMagicResIcon.png',
      },
      HealthScaling: {
        name: '15-90 HP',
        ArrayKey: 'HealthScaling',
        icon: 'StatModsHealthScalingIcon.png',
      },
    },
  };

  constructor() {}

  ngOnInit() {}
}
