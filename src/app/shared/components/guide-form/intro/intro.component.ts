import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormIntroValues } from 'src/app/interfaces/form-intro-values';
import { Champion } from 'src/app/interfaces/guide-form-static-data';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  @Input() champions: Array<Champion>;
  @Input() formValues: FormIntroValues;

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
    if (!this.formValues) return;
    this.form.patchValue({
      name: this.formValues.name,
      champion: this.formValues.champion,
      role: this.formValues.role,
      introduction: this.formValues.introduction,
    });
  }
}
