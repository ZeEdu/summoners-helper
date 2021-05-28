import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { ItemsRollComponent } from './items-roll/items-roll.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [ItemsComponent, ItemsRollComponent, ItemComponent],
  imports: [CommonModule],
  exports: [ItemsComponent, ItemsRollComponent, ItemComponent],
})
export class ItemsModule {}
