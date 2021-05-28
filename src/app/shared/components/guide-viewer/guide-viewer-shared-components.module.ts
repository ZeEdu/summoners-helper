import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [ViewerComponent],
  imports: [CommonModule, IonicModule],
  exports: [ViewerComponent],
})
export class GuideViewerSharedComponentsModule {}
