import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreatsModule } from './threats/threats.module';
import { SpellsModule } from './spells/spells.module';
import { RunesModule } from './runes/runes.module';
import { ItemsModule } from './items/Items.module';
import { IntroductionModule } from './introduction/introduction.module';
import { BonusModule } from './bonus/bonus.module';
import { AbilitiesProgressionModule } from './abilities-progression/abilities-progression.module';
import { GuideViewerComponent } from './guide-viewer.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [GuideViewerComponent],
  imports: [
    CommonModule,
    IonicModule,
    IntroductionModule,
    RunesModule,
    BonusModule,
    SpellsModule,
    AbilitiesProgressionModule,
    ItemsModule,
    ThreatsModule,
  ],
  exports: [GuideViewerComponent],
})
export class GuideViewerModule {}
