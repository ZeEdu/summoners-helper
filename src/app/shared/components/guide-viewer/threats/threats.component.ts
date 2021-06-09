import { Component, Input, OnInit } from '@angular/core';
import { Threat } from 'src/app/interfaces/full-guide';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-threats',
  templateUrl: './threats.component.html',
  styleUrls: ['./threats.component.scss'],
})
export class ThreatsComponent implements OnInit {
  @Input() threats: Threat[];

  public resUrl = environment.backendBaseUrl;

  constructor() {}

  ngOnInit() {}
}
