import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AbilitiesComponent } from 'src/app/shared/components/guide-form/abilities/abilities.component';
import { BonusComponent } from 'src/app/shared/components/guide-form/bonus/bonus.component';
import { GuideComponent } from 'src/app/shared/components/guide-form/guide/guide.component';
import { IntroComponent } from 'src/app/shared/components/guide-form/intro/intro.component';
import { ItemsComponent } from 'src/app/shared/components/guide-form/items/items.component';
import { RunesComponent } from 'src/app/shared/components/guide-form/runes/runes.component';
import { SpellsComponent } from 'src/app/shared/components/guide-form/spells/spells.component';
import { ThreatsComponent } from 'src/app/shared/components/guide-form/threats/threats.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    IntroComponent,
    RunesComponent,
    BonusComponent,
    SpellsComponent,
    ItemsComponent,
    AbilitiesComponent,
    ThreatsComponent,
    GuideComponent,
  ],
  declarations: [
    IntroComponent,
    RunesComponent,
    BonusComponent,
    SpellsComponent,
    ItemsComponent,
    AbilitiesComponent,
    ThreatsComponent,
    GuideComponent,
  ],
  providers: [],
})
export class GuideFormSharedComponentsModule {}
