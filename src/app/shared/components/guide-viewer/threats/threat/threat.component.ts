import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-threat',
  templateUrl: './threat.component.html',
  styleUrls: ['./threat.component.scss'],
})
export class ThreatComponent implements OnInit {
  @Input() src: string;
  @Input() name: string;
  @Input() description: string;

  constructor() {}

  ngOnInit() {}
}
