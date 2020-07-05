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
} from '@ionic/angular';
import { BuildManagerService } from '../../../../services/build-manager.service';
import { Guide, Threat } from '../../../../interfaces/build';
import { Id } from '../../../../interfaces/get-builds';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PathResponse } from 'src/app/interfaces/runes';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-build-edit',
   templateUrl: './build-edit.page.html',
   styleUrls: ['./build-edit.page.scss'],
})
export class BuildEditPage implements OnInit, OnDestroy {
   @ViewChild('slider', { static: false }) slides: IonSlides;
   customAlert = {
      cssClass: 'customAlert',
   };
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
            name: '15-90 HP',
            ArrayKey: 'HealthScaling',
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
   guideID: string;
   private getChampionSubscription: Subscription;
   private getRunesSubscription: Subscription;
   private getSpellsSubscription: Subscription;
   private getItemsSubscription: Subscription;
   private getBuildSubscription: Subscription;
   private getBuildTokenSubscription: Subscription;
   private userSubscription: Subscription;
   private saveEditTokenSubscription: Subscription;
   private updateBuildSubscription: Subscription;
   private submitting: boolean;

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
      this.getChampionSubscription = this.ddHandler
         .getChampions()
         .subscribe(
            (response: ChampionsResponse) =>
               (this.champions = Object.values(response.data))
         );
      this.getRunesSubscription = this.ddHandler
         .getRunes()
         .subscribe((response: Array<PathResponse>) => (this.runes = response));
      this.getSpellsSubscription = this.ddHandler
         .getSpells()
         .subscribe(
            (response: SpellResponse) =>
               (this.spells = Object.values(response.data))
         );
      this.getItemsSubscription = this.ddHandler
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

      this.getBuildTokenSubscription = this.afa.idToken.subscribe((token) => {
         if (token) {
            this.getBuildSubscription = this.buildManager
               .getBuildByID(this.route.snapshot.paramMap.get('id'), token)
               .subscribe((guide: Guide) => {
                  this.fillForms(guide);
                  this.guideID = guide._id;
               });
         }
      });
   }

   ngOnDestroy() {
      this.getBuildTokenSubscription.unsubscribe();
      this.getChampionSubscription.unsubscribe();
      this.getRunesSubscription.unsubscribe();
      this.getSpellsSubscription.unsubscribe();
      this.getItemsSubscription.unsubscribe();
      this.getBuildSubscription.unsubscribe();
      if (this.submitting === true) {
         this.saveEditTokenSubscription.unsubscribe();
         this.userSubscription.unsubscribe();
         this.saveEditTokenSubscription.unsubscribe();
         this.updateBuildSubscription.unsubscribe();
      }
   }

   fillForms(guide: Guide) {
      this.basicForm.patchValue({
         name: guide.name,
         champion: guide.champion,
         role: guide.role,
         introduction: guide.introduction,
      });
      this.runesForm.patchValue({
         runes: guide.runes,
         runesDescription: guide.runesDescription,
      });
      this.bonusForm.patchValue({
         bonus: guide.bonus,
         bonusDescription: guide.bonusDescription,
      });
      this.spellsForm.patchValue({
         spells: guide.spells,
         spellsDescription: guide.spellsDescription,
      });
      const itemArray = this.itemsForm.get('itemsBlock') as FormArray;
      guide.itemsBlock.forEach((itemBlock, i) => {
         const newItemBlock = this.itemRoll();
         newItemBlock.patchValue({
            itemRollName: itemBlock.itemRollName,
            itemArray: itemBlock.itemArray,
         });
         itemArray.push(newItemBlock);
         const itemControl = (this.itemsForm.controls.itemsBlock as FormArray)
            .at(i)
            .get('itemArray') as FormArray;
         itemBlock.itemArray.forEach((val, j) => {
            const itemInsert = this.item();
            itemInsert.patchValue({
               item: val.item,
            });
            itemControl.push(itemInsert);
         });
      });
      this.itemsForm.patchValue({
         itemsDescription: guide.itemsDescription,
      });
      this.abilitiesForm.patchValue({
         abilitiesProgression: guide.abilitiesProgression,
         abilitiesProgressionDescription: guide.abilitiesProgressionDescription,
      });
      const threatArray = this.threatForm.get('threats') as FormArray;
      guide.threats.forEach((value) => {
         const newThreat = this.threat();
         newThreat.patchValue({
            threat: value.threat,
            description: value.description,
         });
         threatArray.push(newThreat);
      });
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
      guideAssign._id = this.guideID;

      this.userSubscription = this.afa.user.subscribe((user) => {
         guideAssign.userUID = user.uid;
      });
      const sendGuide: Guide = guideAssign;
      await this.saveGuide(sendGuide);
   }

   async saveGuide(guide: Guide) {
      await this.presentloading();
      this.saveEditTokenSubscription = this.afa.idToken.subscribe(
         (token) =>
            (this.updateBuildSubscription = this.buildManager
               .updateBuild(guide, token)
               .subscribe(
                  (_) => {
                     this.presentToast(
                        'Successfully saved your build! And will be redirected to your guides page soon'
                     );
                     this.returnToGuides();
                  },
                  (err) => this.presentToast(err.name)
               ))
      );
      this.loading.dismiss();
   }

   // returnToGuides() {
   //    setTimeout(() => {
   //       this.zone.run(() => this.router.navigate(['/home/tabs/builds']));
   //    }, 4000);
   // }

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
}
