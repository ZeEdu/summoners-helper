import { Component, Input, OnInit } from '@angular/core';
import { AbilitiesProgression } from 'src/app/interfaces/build';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss'],
})
export class AbilitiesComponent implements OnInit {
  @Input() champion: string;
  @Input() progression: AbilitiesProgression;

  public progValues: number[];
  public skills = ['q', 'w', 'e', 'r'];
  public skillsAphelios = ['a', 's', 'l'];
  public levels = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
  ];

  constructor() {}

  ngOnInit() {
    const abilitiesArray = Object.values(this.progression);
    this.progValues = abilitiesArray;
  }
}
