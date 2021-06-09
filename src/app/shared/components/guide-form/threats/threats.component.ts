import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormThreatsValues } from 'src/app/interfaces/form-threats-values';
import { Champion } from 'src/app/interfaces/guide-form-static-data';

@Component({
  selector: 'app-threats',
  templateUrl: './threats.component.html',
  styleUrls: ['./threats.component.scss'],
})
export class ThreatsComponent implements OnInit {
  @Input() champions: Array<Champion>;
  @Input() formValues: FormThreatsValues;

  @Output() goBackEmitter = new EventEmitter<boolean>();
  @Output() formEmitter = new EventEmitter<FormThreatsValues>();

  public form: FormGroup;

  customAlert = {
    cssClass: 'customAlert',
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      threats: this.fb.array([this.threat()]),
    });
    if (!this.formValues) return null;
    const threatArray = this.form.get('threats') as FormArray;
    threatArray.removeAt(0);
    this.formValues.threats.forEach((value) => {
      const newThreat = this.threat();
      newThreat.patchValue({
        threat: value.threat,
        description: value.description,
      });
      threatArray.push(newThreat);
    });
  }

  private threat() {
    return this.fb.group({
      threat: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public addThreat(): void {
    const control = this.form.controls.threats as FormArray;
    control.push(this.threat());
  }

  public removeLastThreat(): void {
    const control = this.form.controls.threats as FormArray;
    control.removeAt(control.length - 1);
  }

  public goBack() {
    this.goBackEmitter.emit(true);
  }

  handleFormSubmit() {
    this.formEmitter.emit(this.form.value as FormThreatsValues);
  }
}
