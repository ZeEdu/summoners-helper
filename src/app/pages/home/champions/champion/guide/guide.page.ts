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
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  slideOpts = {
    initialSlide: 0,
  };

  public championRoute: string;

  public guide: FullGuide;

  // public resUrl = environment.backendBaseUrl;

  // public skills = ['q', 'w', 'e', 'r'];

  // public levels = [
  //   0,
  //   1,
  //   2,
  //   3,
  //   4,
  //   5,
  //   6,
  //   7,
  //   8,
  //   9,
  //   10,
  //   11,
  //   12,
  //   13,
  //   14,
  //   15,
  //   16,
  //   17,
  // ];

  // public bonus = {
  //   first: {
  //     AdaptiveForce: {
  //       name: '9 Adaptive',
  //       ArrayKey: 'AdaptiveForce',
  //       icon: 'StatModsAdaptiveForceIcon.png',
  //     },
  //     AttackSpeed: {
  //       name: '10% Attack Speed',
  //       ArrayKey: 'AttackSpeed',
  //       icon: 'StatModsAttackSpeedIcon.png',
  //     },
  //     CDRScaling: {
  //       name: '1-10% CDR',
  //       ArrayKey: 'CDRScaling',
  //       icon: 'StatModsCDRScalingIcon.png',
  //     },
  //   },
  //   second: {
  //     AdaptiveForce: {
  //       name: '9 Adaptive',
  //       ArrayKey: 'AdaptiveForce',
  //       icon: 'StatModsAdaptiveForceIcon.png',
  //     },
  //     Armor: {
  //       name: '6 Armor',
  //       ArrayKey: 'Armor',
  //       icon: 'StatModsArmorIcon.png',
  //     },
  //     MagicRes: {
  //       name: '8 Magic Resist',
  //       ArrayKey: 'MagicRes',
  //       icon: 'StatModsMagicResIcon.png',
  //     },
  //   },
  //   third: {
  //     Armor: {
  //       name: '6 Armor',
  //       ArrayKey: 'Armor',
  //       icon: 'StatModsArmorIcon.png',
  //     },
  //     MagicRes: {
  //       name: '8 Magic Resist',
  //       ArrayKey: 'MagicRes',
  //       icon: 'StatModsMagicResIcon.png',
  //     },
  //     HealthScaling: {
  //       name: '15-90 HP',
  //       ArrayKey: 'HealthScaling',
  //       icon: 'StatModsHealthScalingIcon.png',
  //     },
  //   },
  // };

  // public abilitiesProgression: number[];
  // public champion: ChampionInfo;

  constructor(
    private ddHandler: DataDragonHandlerService,
    private afa: AngularFireAuth,
    private route: ActivatedRoute,
    private buildService: BuildManagerService,
    private UserManager: UserManagerService,
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
