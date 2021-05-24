import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/interfaces/items';
import { FormItemsValues } from 'src/app/interfaces/form-items-values';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  @Input() items: Item[];
  @Output() goBackEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() formEmitter: EventEmitter<FormItemsValues> = new EventEmitter<
    FormItemsValues
  >();

  form: FormGroup;

  customAlert = {
    cssClass: 'customAlert',
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      itemsBlock: this.fb.array([this.itemRoll()]),
      itemsDescription: [''],
    });
  }

  handleForm() {
    const formValue: FormItemsValues = this.form.value;
    this.formEmitter.emit(formValue);
  }

  goBack() {
    this.goBackEmitter.emit(true);
  }

  private itemRoll() {
    return this.fb.group({
      itemRollName: ['', Validators.required],
      itemArray: this.fb.array([this.item()]),
    });
  }

  private item() {
    return this.fb.group({
      item: ['', Validators.required],
    });
  }

  public addItemRoll(): void {
    const control = this.form.controls.itemsBlock as FormArray;
    control.push(this.itemRoll());
  }

  public removeLastRoll(): void {
    const control = this.form.controls.itemsBlock as FormArray;
    control.removeAt(control.length - 1);
  }

  public addItem(index: number) {
    const control = (this.form.controls.itemsBlock as FormArray)
      .at(index)
      .get('itemArray') as FormArray;
    control.push(this.item());
  }

  public removeLastItem(index: number) {
    const control = (this.form.controls.itemsBlock as FormArray)
      .at(index)
      .get('itemArray') as FormArray;
    control.removeAt(control.length - 1);
  }
}
