import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { ItemsRollComponent } from './items-roll/items-roll.component';
import { ItemComponent } from './item/item.component';
import { IonicModule } from '@ionic/angular';
import { ApplicationSharedPipesModule } from 'src/app/shared/pipes/application-pipes.module';

@NgModule({
  declarations: [ItemsComponent, ItemsRollComponent, ItemComponent],
  imports: [IonicModule, CommonModule, ApplicationSharedPipesModule],
  exports: [ItemsComponent, ItemsRollComponent, ItemComponent],
})
export class ItemsModule {}
