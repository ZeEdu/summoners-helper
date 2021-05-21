import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PathResponse, Slot, PathRune } from 'src/app/interfaces/runes';
import { FormRunesValues } from 'src/app/interfaces/form-runes-values';

@Component({
  selector: 'app-runes',
  templateUrl: './runes.component.html',
  styleUrls: ['./runes.component.scss'],
})
export class RunesComponent implements OnInit {
  @Input() runes: Array<PathResponse>;

  @Output() formEmitter: EventEmitter<FormRunesValues> = new EventEmitter<
    FormRunesValues
  >();
  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  public form: FormGroup;

  customAlert = {
    cssClass: 'customAlert',
  };

  public namingSlots = ['first', 'second', 'third', 'fourth'];

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

    this.getSecondaryRunes(0);
  }

  /**
   * disablePolicy
   */
  public disablePolicy(key: string) {
    const r = Object.values(this.form.value.runes.secondarySlots);

    return r.includes(key) ? true : false;
  }

  public getSecondaryRunes(index: number) {
    const c = [...this.runes[index].slots];
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
