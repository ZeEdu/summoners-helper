import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreatsComponent } from './threats.component';
import { ThreatComponent } from './threat/threat.component';

@NgModule({
  declarations: [ThreatsComponent, ThreatComponent],
  imports: [CommonModule],
  exports: [ThreatsComponent, ThreatComponent],
})
export class ThreatsModule {}
