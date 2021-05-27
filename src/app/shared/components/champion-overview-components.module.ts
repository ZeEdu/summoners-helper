import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OverviewComponent } from 'src/app/components/champion/overview/overview.component';
import { HeroImageComponent } from 'src/app/components/champion/overview/hero-image/hero-image.component';

@NgModule({
  declarations: [OverviewComponent, HeroImageComponent],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [OverviewComponent, HeroImageComponent],
})
export class ChampionOverviewSharedComponentsModule {}
