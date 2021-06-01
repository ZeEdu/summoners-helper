import { Component, Input, OnInit } from '@angular/core';
import { Threat } from 'src/app/interfaces/build';
import { GetChampions } from 'src/app/interfaces/get-champions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-threats',
  templateUrl: './threats.component.html',
  styleUrls: ['./threats.component.scss'],
})
export class ThreatsComponent implements OnInit {
  @Input() championThreats: GetChampions[];
  @Input() threats: Threat[];

  public resUrl = environment.backendBaseUrl;

  constructor() {}

  ngOnInit() {}
}
