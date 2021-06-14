import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ScreenSizeService } from 'src/app/services/screensize.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  tabsLayout: 'icon-start' | 'icon-top' = 'icon-top';

  screenSize$: Subscription;

  constructor(
    public platform: Platform,
    private screenSizeService: ScreenSizeService
  ) {
    this.screenSize$ = this.screenSizeService
      .isDesktopView()
      .subscribe((isDesktop) => {
        if (isDesktop) {
          this.tabsLayout = 'icon-start';
        }
      });
  }

  ngOnDestroy(): void {
    this.screenSize$.unsubscribe();
  }
}
