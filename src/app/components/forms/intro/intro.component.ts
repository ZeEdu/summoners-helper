import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Champion } from 'src/app/interfaces/champions';
import { FormIntroValues } from 'src/app/interfaces/form-intro-values';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  @Input() champions: Array<Champion>;
  @Output() formEmitter: EventEmitter<FormIntroValues> = new EventEmitter<
    FormIntroValues
  >();

  customAlert = {
    cssClass: 'customAlert',
  };

  public form: FormGroup;

  constructor(private fb: FormBuilder) {}

  public handleEmit() {
    const formValues: FormIntroValues = this.form.value;
    this.formEmitter.emit(formValues);
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      champion: ['', Validators.required],
      role: ['', Validators.required],
      introduction: [''],
    });
  }
}
