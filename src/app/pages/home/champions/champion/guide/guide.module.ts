import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuidePage } from './guide.page';
import { ApplicationSharedPipesModule } from 'src/app/shared/pipes/application-pipes.module';
import { GuideViewerModule } from 'src/app/shared/components/guide-viewer/guide-viewer.module';

const routes: Routes = [
  {
    path: '',
    component: GuidePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ApplicationSharedPipesModule,
    GuideViewerModule,
  ],
  declarations: [GuidePage],
  providers: [],
})
export class GuidePageModule {}
