import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.scss'],
})
export class HeroImageComponent implements OnInit {
  @Input() name: string;
  @Input() champion: string;
  @Input() role: string;
  @Input() patch: string;

  public resUrl = environment.backendBaseUrl;

  constructor() {}

  ngOnInit() {}
}
