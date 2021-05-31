import { Component, Input, OnInit } from '@angular/core';
import { AbilitiesProgression } from 'src/app/interfaces/build';

@Component({
  selector: 'app-abilities-progression',
  templateUrl: './abilities-progression.component.html',
  styleUrls: ['./abilities-progression.component.scss'],
})
export class AbilitiesProgressionComponent implements OnInit {
  @Input() description: string;
  @Input() champion: string;
  @Input() progression: AbilitiesProgression;

  constructor() {}

  ngOnInit() {}
}
