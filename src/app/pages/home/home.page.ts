import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tabsPlacement: 'bottom' | 'top' = 'bottom';

  tabsLayout: 'icon-start' | 'icon-top' = 'icon-top';

  constructor(public platform: Platform) {
    if (!this.platform.is('mobile')) {
      this.tabsPlacement = 'top';
      this.tabsLayout = 'icon-start';
    }
  }
}
