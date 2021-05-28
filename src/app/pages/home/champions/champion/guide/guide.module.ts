import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuidePage } from './guide.page';
import { ApplicationSharedPipesModule } from 'src/app/shared/pipes/application-pipes.module';
import { GuideViewerSharedComponentsModule } from 'src/app/shared/components/guide-viewer/guide-viewer-shared-components.module';

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
    GuideViewerSharedComponentsModule,
  ],
  declarations: [GuidePage],
  providers: [],
})
export class GuidePageModule {}
