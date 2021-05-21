import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { BonusComponent } from 'src/app/components/forms/bonus/bonus.component';
import { IntroComponent } from 'src/app/components/forms/intro/intro.component';
import { RunesComponent } from 'src/app/components/forms/runes/runes.component';

@NgModule({
  declarations: [
    ErrorMessageComponent,
    IntroComponent,
    RunesComponent,
    BonusComponent,
  ],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    ErrorMessageComponent,
    IntroComponent,
    RunesComponent,
    BonusComponent,
  ],
})
export class ApplicationSharedComponentsModule {}
