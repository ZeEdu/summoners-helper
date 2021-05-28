import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ViewerComponent } from './viewer/viewer.component';
import { AbilitiesProgressionComponent } from './viewer/abilities-progression/abilities-progression.component';
import { BonusComponent } from './viewer/bonus/bonus.component';
import { IntroductionComponent } from './viewer/introduction/introduction.component';
import { ItemsComponent } from './viewer/items/items.component';
import { RunesComponent } from './viewer/runes/runes.component';
import { SpellsComponent } from './viewer/spells/spells.component';
import { ThreatsComponent } from './viewer/threats/threats.component';

@NgModule({
  declarations: [
    ViewerComponent,
    AbilitiesProgressionComponent,
    BonusComponent,
    IntroductionComponent,
    ItemsComponent,
    RunesComponent,
    SpellsComponent,
    ThreatsComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    ViewerComponent,
    AbilitiesProgressionComponent,
    BonusComponent,
    IntroductionComponent,
    ItemsComponent,
    RunesComponent,
    SpellsComponent,
    ThreatsComponent,
  ],
})
export class GuideViewerSharedComponentsModule {}
