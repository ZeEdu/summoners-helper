import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmitGuideInfo } from 'src/app/interfaces/emit-guide-info';
import { Builds, Id } from 'src/app/interfaces/get-builds';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-guide-item',
  templateUrl: './guide-item.component.html',
  styleUrls: ['./guide-item.component.scss'],
})
export class GuideItemComponent implements OnInit {
  @Input() guide: Builds;
  @Output() presentAlert = new EventEmitter<EmitGuideInfo>();

  public resUrl: string = environment.backendBaseUrl;
  public patchVersion: string = environment.patchVersion;

  constructor() {}

  public EmmitPresentAlertConfirm() {
    const emitter: EmitGuideInfo = {
      name: this.guide.name,
      id: this.guide._id,
    };
    this.presentAlert.emit(emitter);
  }

  ngOnInit() {}
}
