import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { SpellsComponent } from 'src/app/components/forms/spells/spells.component';
import { BonusComponent } from 'src/app/components/forms/bonus/bonus.component';
import { IntroComponent } from 'src/app/components/forms/intro/intro.component';
import { RunesComponent } from 'src/app/components/forms/runes/runes.component';
import { ItemsComponent } from 'src/app/components/forms/items/items.component';
import { AbilitiesComponent } from 'src/app/components/forms/abilities/abilities.component';
import { ThreatsComponent } from 'src/app/components/forms/threats/threats.component';
import { GuideComponent } from 'src/app/components/forms/guide/guide.component';

@NgModule({
  declarations: [
    ErrorMessageComponent,
    IntroComponent,
    RunesComponent,
    BonusComponent,
    SpellsComponent,
    ItemsComponent,
    AbilitiesComponent,
    ThreatsComponent,
    GuideComponent,
  ],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    ErrorMessageComponent,
    IntroComponent,
    RunesComponent,
    BonusComponent,
    SpellsComponent,
    ItemsComponent,
    AbilitiesComponent,
    ThreatsComponent,
    GuideComponent,
  ],
})
export class ApplicationSharedComponentsModule {}
