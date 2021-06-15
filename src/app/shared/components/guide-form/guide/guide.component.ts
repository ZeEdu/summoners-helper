import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Guide } from 'src/app/interfaces/build';
import { FormAbilitiesValues } from 'src/app/interfaces/form-abilities-values';
import { FormBonusValues } from 'src/app/interfaces/form-bonus-values';
import { FormIntroValues } from 'src/app/interfaces/form-intro-values';
import { FormItemsValues } from 'src/app/interfaces/form-items-values';
import { FormRunesValues } from 'src/app/interfaces/form-runes-values';
import { FormSpellsValues } from 'src/app/interfaces/form-spells-values';
import { FormThreatsValues } from 'src/app/interfaces/form-threats-values';
import { GuideFormStaticData } from 'src/app/interfaces/guide-form-static-data';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
})
export class GuideComponent implements OnInit {
  @ViewChild('slider', { static: false }) slides: IonSlides;

  @Input() guide: Guide;
  @Input() staticData: GuideFormStaticData;

  @Output()
  emitGuide = new EventEmitter<any>();
  @Output() slideChangeEmitter = new EventEmitter<boolean>();

  loaded = false;

  introValues: FormIntroValues;
  runeValues: FormRunesValues;
  bonusValues: FormBonusValues;
  spellsValues: FormSpellsValues;
  itemsValues: FormItemsValues;
  abilitiesValues: FormAbilitiesValues;
  threatsValues: FormThreatsValues;

  slideOpts = {
    initialSlide: 0,
    autoHeight: true,
    allowTouchMove: false,
  };

  public segment = 0;
  public selectedSlide: any;

  public setDisabledSegment(current: number): boolean {
    if (Number(current) === Number(this.segment)) {
      console.log(Number(current), Number(this.segment));
    }

    return Number(current) === Number(this.segment) ? false : true;
  }

  public async segmentChanged(event: any) {
    await this.selectedSlide.slideTo(this.segment);
  }

  public async slideChanged(slides: IonSlides) {
    this.selectedSlide = slides;
    slides
      .getActiveIndex()
      .then((selectedIndex) => (this.segment = selectedIndex));

    this.slideChangeEmitter.emit(true);
  }

  ngOnInit() {
    if (!this.guide) {
      this.loaded = true;
      return null;
    }

    this.createFormValues(this.guide);
  }

  createFormValues(guide: Guide) {
    this.introValues = {
      name: guide.champion,
      champion: guide.champion,
      introduction: guide.introduction,
      role: guide.role,
    };
    this.runeValues = {
      runes: guide.runes,
      runesDescription: guide.runesDescription,
    };
    this.bonusValues = {
      bonus: guide.bonus,
      bonusDescription: guide.bonusDescription,
    };
    this.spellsValues = {
      spells: guide.spells,
      spellsDescription: guide.spellsDescription,
    };
    this.itemsValues = {
      itemsBlock: guide.itemsBlock,
      itemsDescription: guide.itemsDescription,
    };

    this.abilitiesValues = {
      abilitiesProgression: guide.abilitiesProgression,
      abilitiesProgressionDescription: guide.abilitiesProgressionDescription,
    };

    this.threatsValues = {
      threats: guide.threats,
    };

    this.loaded = true;
  }

  public getChampion() {
    return this.introValues ? this.introValues.champion : null;
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
    this.handleGuideEmitter();
  }

  handleGuideEmitter() {
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
    this.emitGuide.emit(guideAssign);
  }
}
