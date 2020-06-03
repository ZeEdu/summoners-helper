import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
   selector: 'app-build-modelling',
   templateUrl: './build-modelling.page.html',
   styleUrls: ['./build-modelling.page.scss'],
})
export class BuildModellingPage implements OnInit {
   @ViewChild('slider', { static: false }) slides: IonSlides;

   public guideForm: FormGroup;
   public runes: Array<PathResponse>;
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
            (response: ChampionResponse) =>
               (this.champions = Object.values(response.data))
         );
      this.ddHandler
         .getRunes()
         .subscribe((response: Array<PathResponse>) => (this.runes = response));
      this.ddHandler
         .getSpells()
         .subscribe(
            (response: SpellResponse) =>
               (this.spells = Object.values(response.data))
         );
      this.ddHandler
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

   get formOverview() {
      return this.guideForm as FormGroup;
   }

   public async onSubmit() {
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
      this.afa.user.subscribe((user) => {
         guideAssign.userUID = user.uid;
      });
      const sendGuide: Guide = guideAssign;
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

   checkBasicForm() {
      console.log('Is the form valid: ', this.basicForm.valid);
      console.log(this.basicForm.value);
   }

   checkForm() {
      console.log('Is the form valid: ', this.itemsForm.valid);
      console.log(this.itemsForm.value);
   }
}
