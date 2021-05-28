import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonusComponent } from './bonus.component';
import { BonusItemComponent } from './bonus-item/bonus-item.component';

@NgModule({
  declarations: [BonusComponent, BonusItemComponent],
  imports: [CommonModule],
  exports: [BonusComponent, BonusItemComponent],
})
export class BonusModule {}
