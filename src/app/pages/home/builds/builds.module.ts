import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuildsPage } from './builds.page';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';
import { GuideItemComponent } from 'src/app/components/guide-item/guide-item.component';
import { ApplicationSharedPipesModule } from 'src/app/shared/pipes/application-pipes.module';
import { ApplicationSharedComponentsModule } from 'src/app/shared/components/application-components.module';

const routes: Routes = [
  {
    path: '',
    component: BuildsPage,
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
  declarations: [BuildsPage, GuideItemComponent],
  providers: [SafeHtmlPipe],
})
export class BuildsPageModule {}
