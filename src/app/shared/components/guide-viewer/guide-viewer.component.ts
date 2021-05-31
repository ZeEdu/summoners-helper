import { Component, Input, OnInit } from '@angular/core';
import { Guide } from 'src/app/interfaces/build';
import { PathRune } from 'src/app/interfaces/runes';
import { Spell } from 'src/app/interfaces/spells';

@Component({
  selector: 'app-guide-viewer',
  templateUrl: './guide-viewer.component.html',
  styleUrls: ['./guide-viewer.component.scss'],
})
export class GuideViewerComponent implements OnInit {
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

  slideOpts = {
    initialSlide: 4,
  };

  constructor() {}

  ngOnInit() {}
}
