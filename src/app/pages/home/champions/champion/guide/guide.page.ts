import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { BuildManagerService } from '../../../../../services/build-manager.service';
import { Guide } from '../../../../../interfaces/build';
import { PathResponse, PathRune } from '../../../../../interfaces/runes';
import { Spell, SpellResponse } from '../../../../../interfaces/spells';
import { Item, ItemResponse } from '../../../../../interfaces/items';
import { DataDragonHandlerService } from '../../../../../services/data-dragon-handler.service';
import { IonContent, IonSlides } from '@ionic/angular';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ChampionInfo } from 'src/app/interfaces/champion';
import { retry, take } from 'rxjs/operators';
import { GetChampions } from 'src/app/interfaces/get-champions';
import { FullGuide } from 'src/app/interfaces/full-guide';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
})
export class GuidePage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  public championRoute: string;

  public guide: FullGuide;

  constructor(
    private afa: AngularFireAuth,
    private route: ActivatedRoute,
    private buildService: BuildManagerService,
    public safeHtml: SafeHtmlPipe
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.championRoute = params.id;
    });

    this.afa.idToken.pipe(retry(2), take(1)).subscribe((token) => {
      if (!token) return null;
      this.buildService
        .getFullGuide(this.route.snapshot.paramMap.get('guideid'), token)
        .pipe(take(1), retry(2))
        .subscribe((guide: FullGuide) => {
          this.guide = guide;
        });
    });
  }

  handleSlideChange() {
    this.content.scrollToTop();
  }
}
