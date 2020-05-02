import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataDragonHandlerService } from '../../../../services/data-dragon-handler.service';
import { Runes } from '../../../../interfaces/runes';
import { Champion, ChampionsResponse } from '../../../../interfaces/champions';
import { Item, ItemsResponse } from '../../../../interfaces/items';

@Component({
  selector: 'app-build-modelling',
  templateUrl: './build-modelling.page.html',
  styleUrls: ['./build-modelling.page.scss']
})
export class BuildModellingPage implements OnInit {
  public guideForm: FormGroup;
  public runes: Runes[];
  public champions: Champion[];
  public namingSlots = ['first', 'second', 'third', 'fourth'];
  public spells;
  public items: Item[];

  constructor(
    private fb: FormBuilder,
    private ddHandler: DataDragonHandlerService
  ) {}

  ngOnInit() {
    this.ddHandler
      .getRunes()
      .subscribe((response: Array<Runes>) => (this.runes = response));
    this.ddHandler
      .getChampions()
      .subscribe(
        (response: ChampionsResponse) =>
          (this.champions = Object.values(response.data))
      );
    this.ddHandler
      .getItems()
      .subscribe(
        (response: ItemsResponse) => (this.items = Object.values(response.data))
      );
    this.initializeForm();
  }

  initializeForm() {
    this.guideForm = this.fb.group({
      name: [''],
      champion: [''],
      role: [''],
      runes: this.fb.group({
        primaryRune: [''],
        primarySlots: this.fb.group({
          first: [''],
          second: [''],
          third: [''],
          fourth: ['']
        }),
        secondaryRune: [''],
        secondarySlots: this.fb.group({
          first: [''],
          second: [''],
          third: ['']
        })
      }),
      itemsBlock: this.fb.array([this.itemRoll()]),
      abilitiesProgression: this.fb.group({
        l1: [''],
        l2: [''],
        l3: [''],
        l4: [''],
        l5: [''],
        l6: [''],
        l7: [''],
        l8: [''],
        l9: [''],
        l10: [''],
        l11: [''],
        l12: [''],
        l13: [''],
        l14: [''],
        l15: [''],
        l16: [''],
        l17: [''],
        l18: ['']
      }),
      threats: this.fb.array([this.threat()])
    });
  }

  get formOverview() {
    return this.guideForm as FormGroup;
  }

  onSubmit(): void {
    console.log(this.guideForm);
    console.log(typeof this.guideForm);
  }

  private itemRoll() {
    return this.fb.group({
      itemRollName: [''],
      itemArray: this.fb.array([this.item()])
    });
  }

  private item() {
    return this.fb.group({
      item: ['']
    });
  }

  private addItemRoll(): void {
    const control = this.guideForm.controls.itemsBlock as FormArray;
    control.push(this.itemRoll());
  }

  public addItem(index: number) {
    const control = (this.guideForm.controls.itemsBlock as FormArray)
      .at(index)
      .get('itemArray') as FormArray;
    control.push(this.item());
  }

  private threat() {
    return this.fb.group({
      threat: [''],
      description: ['']
    });
  }
  public addThreat() {
    const control = this.guideForm.controls.threats as FormArray;
    control.push(this.threat());
  }
}
