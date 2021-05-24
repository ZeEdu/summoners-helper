import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Champion } from 'src/app/interfaces/champions';
import { FormThreatsValues } from 'src/app/interfaces/form-threats-values';

@Component({
  selector: 'app-threats',
  templateUrl: './threats.component.html',
  styleUrls: ['./threats.component.scss'],
})
export class ThreatsComponent implements OnInit {
  @Input() champions: Array<Champion>;

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
    this.formEmitter.emit(this.form.value);
  }
}
