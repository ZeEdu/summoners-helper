import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataDragonHandlerService } from '../../../../services/data-dragon-handler.service';
import { PathResponse } from '../../../../interfaces/runes';
import { Champion, ChampionResponse } from '../../../../interfaces/champions';
import { Item, ItemResponse } from '../../../../interfaces/items';
import { AngularFireAuth } from '@angular/fire/auth';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
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
   private getChampionSubscription: Subscription;
   private getRunesSubscription: Subscription;
   private getSpellsSubscription: Subscription;
   private getItemsSubscription: Subscription;

   public guideForm: FormGroup;
   public runes: Array<PathResponse>;
   public champions: Array<Champion>;
   public spells: Spell[];
   public items: Item[];
   public namingSlots = ['first', 'second', 'third', 'fourth'];

   public bonus = {
      first: [
         {
            name: '9 Adaptive',
            ArrayKey: 'AdaptiveForce',
         },
         {
            name: '10% Attack Speed',
            ArrayKey: 'AttackSpeed',
         },
         {
            name: '1-10% CDR',
            ArrayKey: 'CDRScaling',
         },
      ],
      second: [
         {
            name: '9 Adaptive',
            ArrayKey: 'AdaptiveForce',
         },
         { name: '6 Armor', ArrayKey: 'Armor' },
         {
            name: '8 Magic Resist',
            ArrayKey: 'MagicRes',
         },
      ],
      third: [
         { name: '6 Armor', ArrayKey: 'Armor' },
         {
            name: '8 Magic Resist',
            ArrayKey: 'MagicRes',
         },
         {
            name: '1-10% CDR',
            ArrayKey: 'CDRScaling',
         },
      ],
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
         .getChampions()
         .subscribe(
            (response: ChampionResponse) =>
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
            (response: ItemResponse) =>
               (this.items = Object.values(response.data))
         );
      this.initializeBasicForm();
      this.initializeRunesForm();
      this.initializeBonusForm();
      this.initializeSpellsForm();
      this.initializeItemForm();
      this.initializeAbilitiesForm();
      this.initializeThreatForm();
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

   public async onSubmit() {
      this.submitting = true;
      const formValues = [
         this.basicForm.value,
         this.runesForm.value,
         this.bonusForm.value,
         this.spellsForm.value,
         this.abilitiesForm.value,
         this.itemsForm.value,
         this.threatForm.value,
      ];
      const guideAssign = Object.assign({}, ...formValues);
      this.userSubscription = this.afa.user.subscribe(async (user) => {
         if (user) {
            guideAssign.userUID = user.uid;
            await user.getIdToken().then((token) => {
               if (token) {
                  const sendGuide: Guide = guideAssign;
                  this.saveGuide(sendGuide, token);
               }
            });
         }
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

   private item() {
      return this.fb.group({
         item: ['', Validators.required],
      });
   }

   public addItemRoll(): void {
      const control = this.itemsForm.controls.itemsBlock as FormArray;
      control.push(this.itemRoll());
   }

   public removeLastRoll(): void {
      const control = this.itemsForm.controls.itemsBlock as FormArray;
      control.removeAt(control.length - 1);
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
   public addThreat(): void {
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
         itemsBlock: this.fb.array([this.itemRoll()]),
         itemsDescription: [''],
      });
   }
   private itemRoll() {
      return this.fb.group({
         itemRollName: ['', Validators.required],
         itemArray: this.fb.array([this.item()]),
      });
   }
   private initializeAbilitiesForm(): void {
      this.abilitiesForm = this.fb.group({
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
   }

   private initializeThreatForm(): void {
      this.threatForm = this.fb.group({
         threats: this.fb.array([this.threat()]),
      });
   }

   slideNext() {
      this.slides.slideNext();
   }

   slidePrevious() {
      this.slides.slidePrev();
   }
}
