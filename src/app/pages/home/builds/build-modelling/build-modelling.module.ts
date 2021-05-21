import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuildModellingPage } from './build-modelling.page';
import { ApplicationSharedComponentsModule } from 'src/app/shared/application-pipes/application-components.module';

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
  ],
  declarations: [BuildModellingPage],
})
export class BuildModellingPageModule {}
