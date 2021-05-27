import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChampionPage } from './champion.page';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ApplicationSharedPipesModule } from 'src/app/shared/pipes/application-pipes.module';
import { ChampionOverviewSharedComponentsModule } from 'src/app/shared/components/champion-overview-components.module';

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
    ChampionOverviewSharedComponentsModule,
  ],
  declarations: [ChampionPage],
})
export class ChampionPageModule {}
