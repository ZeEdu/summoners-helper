import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Champion, ChampionsResponse } from '../../../../interfaces/champions';
import { Spell, SpellResponse } from '../../../../interfaces/spells';
import { Item, ItemResponse } from '../../../../interfaces/items';
import { DataDragonHandlerService } from '../../../../services/data-dragon-handler.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  LoadingController,
  ToastController,
  IonSlides,
  NavController,
  IonContent,
} from '@ionic/angular';
import { BuildManagerService } from '../../../../services/build-manager.service';
import { Guide, Threat } from '../../../../interfaces/build';
import { Id } from '../../../../interfaces/get-builds';
import { tap, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PathResponse } from 'src/app/interfaces/runes';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GuideFormStaticData } from 'src/app/interfaces/guide-form-static-data';

@Component({
  selector: 'app-build-edit',
  templateUrl: './build-edit.page.html',
  styleUrls: ['./build-edit.page.scss'],
})
export class BuildEditPage implements OnInit {
  @ViewChild('slider', { static: false }) slides: IonSlides;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  customAlert = {
    cssClass: 'customAlert',
  };

  public guide: Guide;
  public staticData: GuideFormStaticData;
  public baseUrl = environment.backendBaseUrl;
  public patchVersion = environment.patchVersion;

  public loading: any;
  slideOpts = {
    initialSlide: 0,
    allowTouchMove: false,
  };

  public basicForm: FormGroup;
  public runesForm: FormGroup;
  public bonusForm: FormGroup;
  public spellsForm: FormGroup;
  public itemsForm: FormGroup;
  public abilitiesForm: FormGroup;
  public threatForm: FormGroup;
  guideID: string;
  submitting: boolean;

  constructor(
    private fb: FormBuilder,
    private ddHandler: DataDragonHandlerService,
    private afa: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private buildManager: BuildManagerService,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // this.initializeBasicForm();
    // this.initializeRunesForm();
    // this.initializeBonusForm();
    // this.initializeSpellsForm();
    // this.initializeItemForm();
    // this.initializeAbilitiesForm();
    // this.initializeThreatForm();

    this.afa.idToken.pipe(take(1)).subscribe((token) => {
      if (token) {
        this.buildManager
          .getFormStaticData(token)
          .pipe(take(11))
          .subscribe((data: GuideFormStaticData) => {
            this.staticData = data;
          });

        this.buildManager
          .getBuildByID(this.route.snapshot.paramMap.get('id'), token)
          .pipe(take(1))
          .subscribe((guide: Guide) => {
            this.guide = guide;
            // this.fillForms(guide);
            this.guideID = guide._id;
          });
      }
    });
  }

  handleEmit(e: any) {
    this.onSubmit(e);
  }

  public async onSubmit(guideAssigned: any) {
    this.submitting = true;
    guideAssigned._id = this.guideID;
    this.afa.user.pipe(take(1)).subscribe(async (user) => {
      guideAssigned.userUID = user.uid;
      const sendGuide: Guide = guideAssigned;
      await this.saveGuide(sendGuide);
    });
  }

  async saveGuide(guide: Guide): Promise<void> {
    await this.presentloading();
    this.afa.idToken.pipe(take(1)).subscribe((token) =>
      this.buildManager
        .updateBuild(guide, token)
        .pipe(take(1))
        .subscribe(
          (_) => {
            this.presentToast(
              'Successfully saved your build! And will be redirected to your guides page soon'
            );
            this.returnToGuides();
          },
          (err) => this.presentToast(err.name)
        )
    );
    this.loading.dismiss();
  }

  returnToGuides() {
    setTimeout(() => {
      this.zone.run(() => this.router.navigate(['/home/tabs/builds']));
    }, 4000);
  }

  private item() {
    return this.fb.group({
      item: ['', Validators.required],
    });
  }

  public addItemRoll(): void {
    const control = this.itemsForm.controls.itemsBlock as FormArray;
    control.push(this.itemRoll());
  }

  public addItem(index: number) {
    const control = (this.itemsForm.controls.itemsBlock as FormArray)
      .at(index)
      .get('itemArray') as FormArray;
    control.push(this.item());
  }
  public removeLastItem(index: number) {
    const control = (this.itemsForm.controls.itemsBlock as FormArray)
      .at(index)
      .get('itemArray') as FormArray;
    control.removeAt(control.length - 1);
  }

  private threat() {
    return this.fb.group({
      threat: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  public addThreat() {
    const control = this.threatForm.controls.threats as FormArray;
    control.push(this.threat());
  }

  public removeLastThreat(): void {
    const control = this.threatForm.controls.threats as FormArray;
    control.removeAt(control.length - 1);
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

  private initializeBasicForm() {
    this.basicForm = this.fb.group({
      name: ['', Validators.required],
      champion: ['', Validators.required],
      role: ['', Validators.required],
      introduction: [''],
    });
  }

  private initializeRunesForm() {
    this.runesForm = this.fb.group({
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
  }
  private initializeBonusForm(): void {
    this.bonusForm = this.fb.group({
      bonus: this.fb.group({
        slotOne: ['', Validators.required],
        slotTwo: ['', Validators.required],
        slotThree: ['', Validators.required],
      }),
      bonusDescription: [''],
    });
  }
  private initializeSpellsForm(): void {
    this.spellsForm = this.fb.group({
      spells: this.fb.group({
        first: ['', Validators.required],
        second: ['', Validators.required],
      }),
      spellsDescription: [''],
    });
  }
  private initializeItemForm(): void {
    this.itemsForm = this.fb.group({
      itemsBlock: this.fb.array([]),
      itemsDescription: [''],
    });
  }
  private itemRoll() {
    return this.fb.group({
      itemRollName: ['', Validators.required],
      itemArray: this.fb.array([]),
    });
  }
  private initializeAbilitiesForm(): void {
    this.abilitiesForm = this.fb.group({
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
      abilitiesProgressionDescription: [''],
    });
  }

  private initializeThreatForm(): void {
    this.threatForm = this.fb.group({
      threats: this.fb.array([]),
    });
  }

  slideNext() {
    this.slides.slideNext();
  }

  slidePrevious() {
    this.slides.slidePrev();
  }

  handleSlideEmitter() {
    this.content.scrollToTop();
  }
}
