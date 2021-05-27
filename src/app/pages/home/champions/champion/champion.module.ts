import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChampionPage } from './champion.page';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ApplicationSharedPipesModule } from 'src/app/shared/pipes/application-pipes.module';
import { ChampionSharedComponentsModule } from 'src/app/shared/components/champion/champion-shared-components.module';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ChampionPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ApplicationSharedPipesModule,
    ChampionSharedComponentsModule,
  ],
  declarations: [ChampionPage],
})
export class ChampionPageModule {}
