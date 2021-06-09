import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildManagerService } from '../../../../services/build-manager.service';
import { Guide, Runes } from '../../../../interfaces/build';
import { PathResponse, PathRune } from '../../../../interfaces/runes';
import { Champion, ChampionsResponse } from '../../../../interfaces/champions';
import { Spell, SpellResponse } from '../../../../interfaces/spells';
import { Item, ItemResponse } from '../../../../interfaces/items';
import { DataDragonHandlerService } from '../../../../services/data-dragon-handler.service';
import { IonContent, IonSlides } from '@ionic/angular';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ChampionInfo } from 'src/app/interfaces/champion';
import { take } from 'rxjs/operators';
import { GetChampions } from 'src/app/interfaces/get-champions';
import { FullGuide } from 'src/app/interfaces/full-guide';

@Component({
  selector: 'app-build-view',
  templateUrl: './build-view.page.html',
  styleUrls: ['./build-view.page.scss'],
})
export class BuildViewPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  public guide: FullGuide;

  constructor(
    private afa: AngularFireAuth,
    private route: ActivatedRoute,
    private buildService: BuildManagerService,

    public safeHtml: SafeHtmlPipe
  ) {}

  ngOnInit() {
    this.afa.idToken.pipe(take(1)).subscribe((token) => {
      if (!token) return null;
      this.buildService
        .getFullGuide(this.route.snapshot.paramMap.get('id'), token)
        .subscribe((guide: FullGuide) => {
          this.guide = guide;
        });
    });
  }
  handleSlideChange() {
    this.content.scrollToTop(0.5);
  }
}
