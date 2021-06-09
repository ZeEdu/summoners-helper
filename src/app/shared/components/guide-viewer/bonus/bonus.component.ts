import { Component, Input, OnInit } from '@angular/core';
import { Bonus } from 'src/app/interfaces/full-guide';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss'],
})
export class BonusComponent implements OnInit {
  @Input() bonus: Bonus;
  @Input() description: string;

  constructor() {}

  ngOnInit() {}
}
