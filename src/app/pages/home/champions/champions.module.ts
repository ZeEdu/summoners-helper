import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChampionsPage } from './champions.page';
import { ApplicationSharedPipesModule } from 'src/app/shared/pipes/application-pipes.module';
import { ChampionItemComponent } from 'src/app/components/champion-item/champion-item.component';
import { ApplicationSharedComponentsModule } from 'src/app/shared/components/application-components.module';

const routes: Routes = [
  {
    path: '',
    component: ChampionsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ApplicationSharedPipesModule,
    ApplicationSharedComponentsModule,
  ],
  declarations: [ChampionsPage, ChampionItemComponent],
  providers: [],
})
export class ChampionsPageModule {}
