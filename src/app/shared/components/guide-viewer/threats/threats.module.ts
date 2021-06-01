import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreatsComponent } from './threats.component';
import { ThreatComponent } from './threat/threat.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ThreatsComponent, ThreatComponent],
  imports: [IonicModule, CommonModule],
  exports: [ThreatsComponent, ThreatComponent],
})
export class ThreatsModule {}
