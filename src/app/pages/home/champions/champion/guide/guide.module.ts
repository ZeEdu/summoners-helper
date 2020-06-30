import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuidePage } from './guide.page';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { ApplicationPipesModule } from 'src/app/pipes/application-pipes/application-pipes.module';

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
      ApplicationPipesModule,
   ],
   declarations: [GuidePage],
   providers: [SafeHtmlPipe],
})
export class GuidePageModule {}
