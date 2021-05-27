import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AbilitiesComponent } from 'src/app/components/forms/abilities/abilities.component';
import { BonusComponent } from 'src/app/components/forms/bonus/bonus.component';
import { GuideComponent } from 'src/app/components/forms/guide/guide.component';
import { IntroComponent } from 'src/app/components/forms/intro/intro.component';
import { ItemsComponent } from 'src/app/components/forms/items/items.component';
import { RunesComponent } from 'src/app/components/forms/runes/runes.component';
import { SpellsComponent } from 'src/app/components/forms/spells/spells.component';
import { ThreatsComponent } from 'src/app/components/forms/threats/threats.component';

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
export class GuideFormModule {}
