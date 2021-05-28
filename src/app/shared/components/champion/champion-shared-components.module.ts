import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OverviewComponent } from 'src/app/shared/components/champion/overview/overview.component';
import { HeroImageComponent } from 'src/app/shared/components/champion/overview/hero-image/hero-image.component';
import { BasicStatsComponent } from './overview/basic-stats/basic-stats.component';
import { LoreComponent } from './overview/lore/lore.component';
import { PlayingModeComponent } from './overview/playing-mode/playing-mode.component';
import { StatusComponent } from './status/status.component';
import { AbilitiesComponent } from './abilities/abilities.component';
import { AbilityComponent } from './abilities/ability/ability.component';
import { GuidesComponent } from './guides/guides.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    OverviewComponent,
    HeroImageComponent,
    BasicStatsComponent,
    LoreComponent,
    PlayingModeComponent,
    StatusComponent,
    AbilitiesComponent,
    AbilityComponent,
    GuidesComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    OverviewComponent,
    HeroImageComponent,
    BasicStatsComponent,
    LoreComponent,
    PlayingModeComponent,
    StatusComponent,
    AbilitiesComponent,
    AbilityComponent,
    GuidesComponent,
  ],
})
export class ChampionSharedComponentsModule {}
