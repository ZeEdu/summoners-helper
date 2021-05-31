import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpellsComponent } from './spells.component';
import { SpellComponent } from './spell/spell.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SpellsComponent, SpellComponent],
  imports: [IonicModule, CommonModule],
  exports: [SpellsComponent, SpellComponent],
})
export class SpellsModule {}
