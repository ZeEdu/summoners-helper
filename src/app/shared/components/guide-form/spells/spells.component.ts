import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormSpellsValues } from 'src/app/interfaces/form-spells-values';
import { Spell } from 'src/app/interfaces/spells';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss'],
})
export class SpellsComponent implements OnInit {
  @Input() spells: Spell[];
  @Input() formValues: FormSpellsValues;

  @Output() goBackEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() formEmitter: EventEmitter<FormSpellsValues> = new EventEmitter<
    FormSpellsValues
  >();

  form: FormGroup;

  customAlert = {
    cssClass: 'customAlert',
  };

  constructor(private fb: FormBuilder) {}

  disablePolicy(spellId: string) {
    const inForm = Object.values(this.form.value.spells);

    return inForm.includes(spellId) ? true : false;
  }

  ngOnInit() {
    this.form = this.fb.group({
      spells: this.fb.group({
        first: ['', Validators.required],
        second: ['', Validators.required],
      }),
      spellsDescription: [''],
    });

    if (!this.formValues) return null;
    this.form.patchValue({
      spells: this.formValues.spells,
      spellsDescription: this.formValues.spellsDescription,
    });
  }

  goBack() {
    this.goBackEmitter.emit(true);
  }

  handleFormSubmit() {
    this.formEmitter.emit(this.form.value);
  }
}
