import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  @Input() messageTitle: string;
  @Input() messageText: string;
  @Input() imageSource: string;
  @Input() tryAgainMessage: string;
  @Output() reloadEmitter = new EventEmitter<boolean>();

  constructor() {}

  public emitReload() {
    this.reloadEmitter.emit(true);
  }
}
