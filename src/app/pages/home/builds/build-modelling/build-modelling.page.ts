import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataDragonHandlerService } from '../../../../services/data-dragon-handler.service';
import { PathResponse } from '../../../../interfaces/runes';
import { Champion, ChampionsResponse } from '../../../../interfaces/champions';
import { Item, ItemResponse } from '../../../../interfaces/items';
import { AngularFireAuth } from '@angular/fire/auth';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Guide } from 'src/app/interfaces/build';
import { BuildManagerService } from 'src/app/services/build-manager.service';
import { SpellResponse, Spell } from 'src/app/interfaces/spells';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormIntroValues } from 'src/app/interfaces/form-intro-values';
import { FormRunesValues } from 'src/app/interfaces/form-runes-values';
import { FormBonusValues } from 'src/app/interfaces/form-bonus-values';
import { FormSpellsValues } from 'src/app/interfaces/form-spells-values';
import { FormItemsValues } from 'src/app/interfaces/form-items-values';
import { FormAbilitiesValues } from 'src/app/interfaces/form-abilities-values';
import { FormThreatsValues } from 'src/app/interfaces/form-threats-values';

@Component({
  selector: 'app-build-modelling',
  templateUrl: './build-modelling.page.html',
  styleUrls: ['./build-modelling.page.scss'],
})
export class BuildModellingPage implements OnInit, OnDestroy {
  @ViewChild('slider', { static: false }) slides: IonSlides;
  private getChampionSubscription: Subscription;
  private getRunesSubscription: Subscription;
  private getSpellsSubscription: Subscription;
  private getItemsSubscription: Subscription;

  public guideForm: FormGroup;
  public runes: Array<PathResponse>;
  public champions: Array<Champion>;
  public spells: Spell[];
  public items: Item[];

  public loading: any;

  slideOpts = {
    initialSlide: 0,
    allowTouchMove: false,
  };

  private introValues: FormIntroValues;
  private runeValues: FormRunesValues;
  private bonusValues: FormBonusValues;
  private spellsValues: FormSpellsValues;
  private itemsValues: FormItemsValues;
  private abilitiesValues: FormAbilitiesValues;
  private threatsValues: FormThreatsValues;

  public getChampion() {
    return this.introValues ? this.introValues.champion : null;
  }

  public introExists() {
    return this.introValues ? true : false;
  }

  customAlert = {
    cssClass: 'customAlert',
  };

  userSubscription: Subscription;
  idTokenSubscription: void;
  submitting: boolean;

  constructor(
    private fb: FormBuilder,
    private ddHandler: DataDragonHandlerService,
    private afa: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private buildManager: BuildManagerService,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.getChampionSubscription = this.getChampionSubscription = this.ddHandler
      .getChampionsList()
      .subscribe(
        (response: ChampionsResponse) =>
          (this.champions = Object.values(response.data))
      );
    this.getRunesSubscription = this.getRunesSubscription = this.ddHandler
      .getRunes()
      .subscribe((response: Array<PathResponse>) => (this.runes = response));
    this.getSpellsSubscription = this.getSpellsSubscription = this.ddHandler
      .getSpells()
      .subscribe(
        (response: SpellResponse) =>
          (this.spells = Object.values(response.data))
      );
    this.getItemsSubscription = this.getItemsSubscription = this.ddHandler
      .getItems()
      .subscribe(
        (response: ItemResponse) => (this.items = Object.values(response.data))
      );
  }

  ngOnDestroy() {
    this.getChampionSubscription.unsubscribe();
    this.getRunesSubscription.unsubscribe();
    this.getSpellsSubscription.unsubscribe();
    this.getItemsSubscription.unsubscribe();
    if (this.submitting === true) {
      this.userSubscription.unsubscribe();
    }
  }

  public async submitGuide() {
    this.submitting = true;
    const formValues = [
      this.introValues,
      this.runeValues,
      this.bonusValues,
      this.spellsValues,
      this.itemsValues,
      this.abilitiesValues,
      this.threatsValues,
    ];
    const guideAssign = Object.assign({}, ...formValues);
    this.userSubscription = this.afa.user.subscribe(async (user) => {
      if (!user) return null;
      guideAssign.userUID = user.uid;
      user.getIdToken().then((token) => {
        if (!token) return null;
        const sendGuide: Guide = guideAssign;
        this.saveGuide(sendGuide, token);
      });
    });
  }

  async saveGuide(guide: Guide, token: string) {
    await this.presentloading();
    this.buildManager.addNewBuild(guide, token).subscribe(
      () => {
        this.presentToast(
          'Successfully saved your build! And wil be redirected to your guides page'
        );
        this.returnToGuides();
      },
      (err) => {
        this.presentToast(err.name);
      }
    );
    this.loading.dismiss();
  }

  returnToGuides() {
    setTimeout(
      () => this.zone.run(() => this.router.navigate(['/home/tabs/builds'])),
      4000
    );
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

  slideNext() {
    this.slides.slideNext();
  }

  slidePrevious() {
    this.slides.slidePrev();
  }

  handleIntroFormEmitter(e: FormIntroValues) {
    this.introValues = e;
    this.slideNext();
  }

  handleRunesFormEmitter(e: FormRunesValues) {
    this.runeValues = e;
    this.slideNext();
  }

  handleBonusFormEmitter(e: FormBonusValues) {
    this.bonusValues = e;
    this.slideNext();
  }

  handleSpellsFormEmitter(e: FormSpellsValues) {
    this.spellsValues = e;
    this.slideNext();
  }

  handleItemsFormEmitter(e: FormItemsValues) {
    this.itemsValues = e;
    this.slideNext();
  }

  handleAbilitiesFormEmitter(e: FormAbilitiesValues) {
    this.abilitiesValues = e;
    this.slideNext();
  }

  handleThreatsFormEmitter(e: FormThreatsValues) {
    this.threatsValues = e;
    this.submitGuide();
  }
}
