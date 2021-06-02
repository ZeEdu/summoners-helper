import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuildViewPage } from './build-view.page';
import { ApplicationSharedPipesModule } from 'src/app/shared/pipes/application-pipes.module';
import { GuideViewerModule } from 'src/app/shared/components/guide-viewer/guide-viewer.module';

const routes: Routes = [
  {
    path: '',
    component: BuildViewPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ApplicationSharedPipesModule,
    ApplicationSharedPipesModule,
    GuideViewerModule,
  ],
  declarations: [BuildViewPage],
  providers: [],
})
export class BuildViewPageModule {}
