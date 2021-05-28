import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction.component';
import { IonicModule } from '@ionic/angular';
import { HeroImageComponent } from './hero-image/hero-image.component';

@NgModule({
  declarations: [IntroductionComponent, HeroImageComponent],
  imports: [IonicModule, CommonModule],
  exports: [IntroductionComponent, HeroImageComponent],
})
export class IntroductionModule {}
