import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBonusValues } from 'src/app/interfaces/form-bonus-values';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss'],
})
export class BonusComponent implements OnInit {
  form: FormGroup;
  @Input() formValues: FormBonusValues;
  @Output() goBackEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() formEmitter: EventEmitter<FormBonusValues> = new EventEmitter<
    FormBonusValues
  >();

  constructor(private fb: FormBuilder) {}

  public bonus = {
    first: [
      {
        name: '9 Adaptive',
        ArrayKey: 'AdaptiveForce',
      },
      {
        name: '10% Attack Speed',
        ArrayKey: 'AttackSpeed',
      },
      {
        name: '1-10% CDR',
        ArrayKey: 'CDRScaling',
      },
    ],
    second: [
      {
        name: '9 Adaptive',
        ArrayKey: 'AdaptiveForce',
      },
      { name: '6 Armor', ArrayKey: 'Armor' },
      {
        name: '8 Magic Resist',
        ArrayKey: 'MagicRes',
      },
    ],
    third: [
      { name: '6 Armor', ArrayKey: 'Armor' },
      {
        name: '8 Magic Resist',
        ArrayKey: 'MagicRes',
      },
      {
        name: '1-10% CDR',
        ArrayKey: 'CDRScaling',
      },
    ],
  };

  customAlert = {
    cssClass: 'customAlert',
  };

  ngOnInit() {
    this.form = this.fb.group({
      bonus: this.fb.group({
        slotOne: ['', Validators.required],
        slotTwo: ['', Validators.required],
        slotThree: ['', Validators.required],
      }),
      bonusDescription: [''],
    });
    if (!this.formValues) return null;
    this.form.patchValue({
      bonus: this.formValues.bonus,
      bonusDescription: this.formValues.bonusDescription,
    });
  }

  goBack() {
    this.goBackEmitter.emit(true);
  }

  handleFormSubmit() {
    this.formEmitter.emit(this.form.value);
  }
}
