import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunesComponent } from './runes.component';
import { RuneComponent } from './rune/rune.component';
import { IonicModule } from '@ionic/angular';
import { ApplicationSharedPipesModule } from 'src/app/shared/pipes/application-pipes.module';

@NgModule({
  declarations: [RunesComponent, RuneComponent],
  imports: [IonicModule, CommonModule, ApplicationSharedPipesModule],
  exports: [RunesComponent, RuneComponent],
})
export class RunesModule {}
