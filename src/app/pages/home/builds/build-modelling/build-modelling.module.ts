import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuildModellingPage } from './build-modelling.page';
import { ApplicationSharedComponentsModule } from 'src/app/shared/components/application-components.module';
import { GuideFormSharedComponentsModule } from 'src/app/shared/components/guide-form/guide-form-shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: BuildModellingPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ApplicationSharedComponentsModule,
    GuideFormSharedComponentsModule,
  ],
  declarations: [BuildModellingPage],
})
export class BuildModellingPageModule {}
