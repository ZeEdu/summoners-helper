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

  @Output() goBackEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() formEmitter: EventEmitter<FormSpellsValues> = new EventEmitter<
    FormSpellsValues
  >();

  form: FormGroup;

  customAlert = {
    cssClass: 'customAlert',
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      spells: this.fb.group({
        first: ['', Validators.required],
        second: ['', Validators.required],
      }),
      spellsDescription: [''],
    });
  }

  goBack() {
    this.goBackEmitter.emit(true);
  }

  handleFormSubmit() {
    this.formEmitter.emit(this.form.value);
  }
}
