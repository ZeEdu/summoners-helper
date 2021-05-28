import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpellsComponent } from './spells.component';
import { SpellComponent } from './spell/spell.component';

@NgModule({
  declarations: [SpellsComponent, SpellComponent],
  imports: [CommonModule],
  exports: [SpellsComponent, SpellComponent],
})
export class SpellsModule {}
