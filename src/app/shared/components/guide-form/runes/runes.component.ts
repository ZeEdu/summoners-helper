import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormRunesValues } from 'src/app/interfaces/form-runes-values';
import { Runes } from 'src/app/interfaces/guide-form-static-data';

@Component({
  selector: 'app-runes',
  templateUrl: './runes.component.html',
  styleUrls: ['./runes.component.scss'],
})
export class RunesComponent implements OnInit {
  @Input() runes: Runes[];
  @Input() formValues: FormRunesValues;

  @Output() formEmitter: EventEmitter<FormRunesValues> = new EventEmitter<
    FormRunesValues
  >();
  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  public form: FormGroup;

  customAlert = {
    cssClass: 'customAlert',
  };

  public namingSlots = ['first', 'second', 'third', 'fourth'];
  public namingSlotsSecond = ['first', 'second', 'third'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      runes: this.fb.group({
        primaryRune: ['', Validators.required],
        primarySlots: this.fb.group({
          first: ['', Validators.required],
          second: ['', Validators.required],
          third: ['', Validators.required],
          fourth: ['', Validators.required],
        }),
        secondaryRune: ['', Validators.required],
        secondarySlots: this.fb.group({
          first: ['', Validators.required],
          second: ['', Validators.required],
          third: ['', Validators.required],
        }),
      }),
      runesDescription: [''],
    });

    if (!this.formValues) return;
    this.form.patchValue({
      runes: this.formValues.runes,
      runesDescription: this.formValues.runesDescription,
    });
  }

  public getOptions(domain: string, depth: number) {
    return this.runes.find((i) => i.key === domain).slots[depth].runes;
  }

  public disabledPrimaryRunes(key: string) {
    if (!this.form.value.runes.secondaryRune) return false;
    return this.form.value.runes.secondaryRune === key ? true : false;
  }

  public disabledSecondaryRunes(key: string) {
    if (!this.form.value.runes.primaryRune) return false;
    return this.form.value.runes.primaryRune === key ? true : false;
  }

  public disablePolicy(key: string) {
    const r = Object.values(this.form.value.runes.secondarySlots);

    return r.includes(key) ? true : false;
  }

  public getSecondaryRunes() {
    if (!this.form.value.runes.secondaryRune) return [];
    const a = this.runes.find(
      (i) => i.key === this.form.value.runes.secondaryRune
    );

    const c = [...a.slots];
    c.shift();

    const r = c.map((slot) => {
      return slot.runes;
    });

    let acc = [];
    r.forEach((i) => {
      acc = [...acc, ...i];
    });

    return acc;
  }

  handleGoBack() {
    this.goBack.emit(true);
  }

  handleFormEmitter() {
    this.formEmitter.emit(this.form.value);
  }
}
