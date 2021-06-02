import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataDragonHandlerService } from '../../../../services/data-dragon-handler.service';
import { PathResponse } from '../../../../interfaces/runes';
import { Champion, ChampionsResponse } from '../../../../interfaces/champions';
import { Item, ItemResponse } from '../../../../interfaces/items';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  IonContent,
  IonSlides,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Guide } from 'src/app/interfaces/build';
import { BuildManagerService } from 'src/app/services/build-manager.service';
import { SpellResponse, Spell } from 'src/app/interfaces/spells';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-build-modelling',
  templateUrl: './build-modelling.page.html',
  styleUrls: ['./build-modelling.page.scss'],
})
export class BuildModellingPage implements OnInit, OnDestroy {
  @ViewChild('slider', { static: false }) slides: IonSlides;
  @ViewChild(IonContent, { static: false }) content: IonContent;

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
  userSubscription: Subscription;
  idTokenSubscription: void;
  submitting: boolean;

  customAlert = {
    cssClass: 'customAlert',
  };

  slideOpts = {
    initialSlide: 0,
    allowTouchMove: false,
  };

  constructor(
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
    if (this.submitting) {
      this.userSubscription.unsubscribe();
    }
  }

  public handleSlideEmitter(e: boolean) {
    this.content.scrollToTop();
  }

  public async submitGuide(formConstructed: any) {
    this.submitting = true;
    this.userSubscription = this.afa.user.subscribe(async (user) => {
      if (!user) return null;
      formConstructed.userUID = user.uid;
      user.getIdToken().then((token) => {
        if (!token) return null;
        const sendGuide: Guide = formConstructed;
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

    // setTimeout(() => this.router.navigate(['/home/tabs/builds']), 4000);
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
