import { Component, Input, OnInit } from '@angular/core';
import { ArySlots } from 'src/app/interfaces/full-guide';
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
  @Input() runes: ArySlots;

  public resUrl = environment.backendBaseUrl;

  constructor() {}

  ngOnInit() {}
}
