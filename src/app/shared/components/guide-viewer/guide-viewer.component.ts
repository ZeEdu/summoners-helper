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
import { GetChampions } from 'src/app/interfaces/get-champions';
import { Item } from 'src/app/interfaces/items';
import { PathRune } from 'src/app/interfaces/runes';
import { Spell } from 'src/app/interfaces/spells';

@Component({
  selector: 'app-guide-viewer',
  templateUrl: './guide-viewer.component.html',
  styleUrls: ['./guide-viewer.component.scss'],
})
export class GuideViewerComponent implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  @Input() guide: Guide;
  @Input() guideCreatorUsername: string;
  @Input() firstPrimaryRune: PathRune;
  @Input() secondPrimaryRune: PathRune;
  @Input() thirdPrimaryRune: PathRune;
  @Input() fourthPrimaryRune: PathRune;
  @Input() firstSecondaryRune: PathRune;
  @Input() secondSecondaryRune: PathRune;
  @Input() thirdSecondaryRune: PathRune;
  @Input() firstSpell: Spell;
  @Input() secondSpell: Spell;
  @Input() items: { [key: string]: Item };
  @Input() championThreats: GetChampions[];

  @Output() slideChangeEmitter = new EventEmitter<boolean>();

  slideOpts = {
    initialSlide: 0,
  };

  handleSlideChange() {
    this.slideChangeEmitter.emit(true);
  }

  constructor() {}

  ngOnInit() {}
}
