import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunesComponent } from './runes.component';
import { RuneComponent } from './rune/rune.component';

@NgModule({
  declarations: [RunesComponent, RuneComponent],
  imports: [CommonModule],
  exports: [RunesComponent, RuneComponent],
})
export class RunesModule {}
