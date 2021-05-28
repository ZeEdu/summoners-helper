import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbilitiesProgressionComponent } from './abilities-progression.component';
import { IonicModule } from '@ionic/angular';
import { AbilitiesComponent } from './abilities/abilities.component';

@NgModule({
  declarations: [AbilitiesProgressionComponent, AbilitiesComponent],
  imports: [IonicModule, CommonModule],
  exports: [AbilitiesProgressionComponent, AbilitiesComponent],
})
export class AbilitiesProgressionModule {}
