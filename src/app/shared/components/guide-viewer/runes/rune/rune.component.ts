import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rune',
  templateUrl: './rune.component.html',
  styleUrls: ['./rune.component.scss'],
})
export class RuneComponent implements OnInit {
  @Input() icon: string;
  @Input() name: string;
  @Input() longDesc: string;

  public resUrl = environment.backendBaseUrl;

  constructor() {}

  ngOnInit() {}
}
