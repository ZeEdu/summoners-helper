import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.scss'],
})
export class HeroImageComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() title: string;

  public resUrl = environment.backendBaseUrl;

  constructor() {}

  ngOnInit() {}
}
