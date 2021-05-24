import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormAbilitiesValues } from 'src/app/interfaces/form-abilities-values';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss'],
})
export class AbilitiesComponent implements OnInit {
  @Input() champion: string;
  @Output() goBackEmitter = new EventEmitter<boolean>();
  @Output() formEmitter = new EventEmitter<FormAbilitiesValues>();

  form: FormGroup;

  public levels = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
  ];

  customAlert = {
    cssClass: 'customAlert',
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      abilitiesProgression: this.fb.group({
        l1: [null, Validators.required],
        l2: [null, Validators.required],
        l3: [null, Validators.required],
        l4: [null, Validators.required],
        l5: [null, Validators.required],
        l6: [null, Validators.required],
        l7: [null, Validators.required],
        l8: [null, Validators.required],
        l9: [null, Validators.required],
        l10: [null, Validators.required],
        l11: [null, Validators.required],
        l12: [null, Validators.required],
        l13: [null, Validators.required],
        l14: [null, Validators.required],
        l15: [null, Validators.required],
        l16: [null, Validators.required],
        l17: [null, Validators.required],
        l18: [null, Validators.required],
      }),
      abilitiesProgressionDescription: [''],
    });

    setTimeout(() => {
      if (this.champion) {
        console.log(this.champion);
      }
    }, 5000);
  }

  goBack() {
    this.goBackEmitter.emit(true);
  }

  handleFormSubmit() {
    this.formEmitter.emit(this.form.value);
  }
}
