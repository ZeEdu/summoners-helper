import { Component, Input, OnInit } from '@angular/core';
import { PathRune } from 'src/app/interfaces/runes';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-runes',
  templateUrl: './runes.component.html',
  styleUrls: ['./runes.component.scss'],
})
export class RunesComponent implements OnInit {
  @Input() order: 'first' | 'second';
  @Input() description?: string;
  @Input() path: string;
  @Input() firstRune: PathRune;
  @Input() secondRune: PathRune;
  @Input() thirdRune: PathRune;
  @Input() fouthRune?: PathRune;

  public resUrl = environment.backendBaseUrl;

  constructor() {}

  ngOnInit() {}
}
