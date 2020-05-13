import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataDragonHandlerService } from '../../../../services/data-dragon-handler.service';
import { Runes } from '../../../../interfaces/runes';
import { Champion, ChampionsResponse } from '../../../../interfaces/champions';
import { Item, ItemsResponse } from '../../../../interfaces/items';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { Guide } from 'src/app/interfaces/build';
import { BuildManagerService } from 'src/app/services/build-manager.service';
import { SpellResponse, Spell } from 'src/app/interfaces/spells';

@Component({
  selector: 'app-build-modelling',
  templateUrl: './build-modelling.page.html',
  styleUrls: ['./build-modelling.page.scss'],
})
export class BuildModellingPage implements OnInit {
  public guideForm: FormGroup;
  public runes: Runes[];
  public champions: Array<Champion>;
  public spells: Spell[];
  public items: Item[];
  public namingSlots = ['first', 'second', 'third', 'fourth'];
  public bonus = {
    first: ['9 Adaptive', '10% Attack Speed', '1-10% CDR'],
    second: ['9 Adaptive', '6 Armor', '8 Magic Resist'],
    third: ['6 Armor', '8 Magic Resist', '15-90 HP'],
  };

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
  public loading: any;

  constructor(
    private fb: FormBuilder,
    private ddHandler: DataDragonHandlerService,
    private afa: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private buildManager: BuildManagerService
  ) {}

  ngOnInit() {
    this.ddHandler
      .getChampions()
      .subscribe(
        (response: ChampionsResponse) =>
          (this.champions = Object.values(response.data))
      );
    this.ddHandler
      .getRunes()
      .subscribe((response: Array<Runes>) => (this.runes = response));
    this.ddHandler
      .getSpells()
      .subscribe(
        (response: SpellResponse) =>
          (this.spells = Object.values(response.data))
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
      name: ['', Validators.required],
      champion: ['', Validators.required],
      role: ['', Validators.required],
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
      bonus: this.fb.group({
        slotOne: ['', Validators.required],
        slotTwo: ['', Validators.required],
        slotThree: ['', Validators.required],
      }),
      spells: this.fb.group({
        first: ['', Validators.required],
        second: ['', Validators.required],
      }),
      itemsBlock: this.fb.array([this.itemRoll()]),
      abilitiesProgression: this.fb.group({
        l1: ['', Validators.required],
        l2: ['', Validators.required],
        l3: ['', Validators.required],
        l4: ['', Validators.required],
        l5: ['', Validators.required],
        l6: ['', Validators.required],
        l7: ['', Validators.required],
        l8: ['', Validators.required],
        l9: ['', Validators.required],
        l10: ['', Validators.required],
        l11: ['', Validators.required],
        l12: ['', Validators.required],
        l13: ['', Validators.required],
        l14: ['', Validators.required],
        l15: ['', Validators.required],
        l16: ['', Validators.required],
        l17: ['', Validators.required],
        l18: ['', Validators.required],
      }),
      threats: this.fb.array([this.threat()]),
      description: ['', Validators.required],
    });
  }

  get formOverview() {
    return this.guideForm as FormGroup;
  }

  public async onSubmit() {
    const formData = this.guideForm.value;
    this.afa.user.subscribe((user) => {
      formData.userUID = user.uid;
    });
    const sendGuide: Guide = formData;
    console.log(sendGuide);
    await this.saveGuide(sendGuide);
  }

  async saveGuide(guide: Guide) {
    await this.presentloading();
    this.buildManager.addNewBuild(guide).subscribe(
      (res) => {
        this.presentToast('Successfully saved your build!');
      },
      (err) => {
        this.presentToast(err.name);
      }
    );
    this.loading.dismiss();
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
      threat: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  public addThreat() {
    const control = this.guideForm.controls.threats as FormArray;
    control.push(this.threat());
  }

  async presentloading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...',
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
    await toast.present();
  }
}
