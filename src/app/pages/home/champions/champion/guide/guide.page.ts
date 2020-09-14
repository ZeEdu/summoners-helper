import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildManagerService } from '../../../../../services/build-manager.service';
import { Guide } from '../../../../../interfaces/build';
import { PathResponse, PathRune } from '../../../../../interfaces/runes';
import {
   Champion,
   ChampionsResponse,
} from '../../../../../interfaces/champions';
import { Spell, SpellResponse } from '../../../../../interfaces/spells';
import { Item, ItemResponse } from '../../../../../interfaces/items';
import { DataDragonHandlerService } from '../../../../../services/data-dragon-handler.service';
import { IonSlides } from '@ionic/angular';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ChampionInfo } from 'src/app/interfaces/champion';
import { take } from 'rxjs/operators';

@Component({
   selector: 'app-guide',
   templateUrl: './guide.page.html',
   styleUrls: ['./guide.page.scss'],
})
export class GuidePage implements OnInit {
   @ViewChild(IonSlides, { static: false }) slides: IonSlides;
   slideOpts = {
      initialSlide: 0,
   };
   public guideCreatorUsername: string;
   public guide: Guide;
   public paths: PathResponse[];
   public primaryRune: PathRune;
   public primaryPathData: PathResponse;
   public runeSlots: any;
   public runes: Array<PathRune>;
   public firstPrimaryRune: PathRune;
   public secondPrimaryRune: PathRune;
   public thirdPrimaryRune: PathRune;
   public fourthPrimaryRune: PathRune;
   public firstSecondaryRune: PathRune;
   public secondSecondaryRune: PathRune;
   public thirdSecondaryRune: PathRune;
   public firstSpell: Spell;
   public secondSpell: Spell;
   public resUrl = environment.backendBaseUrl;

   public champions: { [key: string]: Champion };
   public spells: Spell[];
   public items: { [key: string]: Item };
   public secondaryPathData: PathResponse;
   public skills = ['q', 'w', 'e', 'r'];
   public levels = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
   ];

   public bonus = {
      first: {
         AdaptiveForce: {
            name: '9 Adaptive',
            ArrayKey: 'AdaptiveForce',
            icon: 'StatModsAdaptiveForceIcon.png',
         },
         AttackSpeed: {
            name: '10% Attack Speed',
            ArrayKey: 'AttackSpeed',
            icon: 'StatModsAttackSpeedIcon.png',
         },
         CDRScaling: {
            name: '1-10% CDR',
            ArrayKey: 'CDRScaling',
            icon: 'StatModsCDRScalingIcon.png',
         },
      },
      second: {
         AdaptiveForce: {
            name: '9 Adaptive',
            ArrayKey: 'AdaptiveForce',
            icon: 'StatModsAdaptiveForceIcon.png',
         },
         Armor: {
            name: '6 Armor',
            ArrayKey: 'Armor',
            icon: 'StatModsArmorIcon.png',
         },
         MagicRes: {
            name: '8 Magic Resist',
            ArrayKey: 'MagicRes',
            icon: 'StatModsMagicResIcon.png',
         },
      },
      third: {
         Armor: {
            name: '6 Armor',
            ArrayKey: 'Armor',
            icon: 'StatModsArmorIcon.png',
         },
         MagicRes: {
            name: '8 Magic Resist',
            ArrayKey: 'MagicRes',
            icon: 'StatModsMagicResIcon.png',
         },
         HealthScaling: {
            name: '15-90 HP',
            ArrayKey: 'HealthScaling',
            icon: 'StatModsHealthScalingIcon.png',
         },
      },
   };

   public abilitiesProgression: number[];
   public champion: ChampionInfo;

   constructor(
      private ddHandler: DataDragonHandlerService,
      private afa: AngularFireAuth,
      private route: ActivatedRoute,
      private buildService: BuildManagerService,
      private UserManager: UserManagerService,
      public safeHtml: SafeHtmlPipe
   ) {}

   ngOnInit() {
      this.afa.idToken.pipe(take(1)).subscribe((token) => {
         this.buildService
            .getBuildByID(this.route.snapshot.paramMap.get('id'), token)
            .subscribe((guide: Guide) => {
               this.guide = guide;
               const abilitiesArray = Object.values(guide.abilitiesProgression);
               this.abilitiesProgression = abilitiesArray;
               this.UserManager.getUsernameByUID(guide.userUID, token)
                  .pipe(take(1))
                  .subscribe(
                     (creatorUsername: string) =>
                        (this.guideCreatorUsername = creatorUsername)
                  );
               this.ddHandler
                  .getChampions()
                  .pipe(take(1))
                  .subscribe(
                     (response: ChampionsResponse) =>
                        (this.champions = response.data)
                  );
               this.ddHandler
                  .getRunes()
                  .pipe(take(1))
                  .subscribe((response: Array<PathResponse>) => {
                     this.primaryPathData = response.find(
                        (path) => path.key === guide.runes.primaryRune
                     );
                     this.secondaryPathData = response.find(
                        (path) => path.key === guide.runes.secondaryRune
                     );
                     const runesArray = [];
                     response.forEach((r: PathResponse) => {
                        r.slots.forEach((runes) =>
                           runes.runes.forEach((key) => runesArray.push(key))
                        );
                     });
                     this.firstPrimaryRune = runesArray.find(
                        (rune) => rune.key === guide.runes.primarySlots.first
                     );
                     this.secondPrimaryRune = runesArray.find(
                        (rune) => rune.key === guide.runes.primarySlots.second
                     );
                     this.thirdPrimaryRune = runesArray.find(
                        (rune) => rune.key === guide.runes.primarySlots.third
                     );
                     this.fourthPrimaryRune = runesArray.find(
                        (rune) => rune.key === guide.runes.primarySlots.fourth
                     );

                     this.firstSecondaryRune = runesArray.find(
                        (rune) => rune.key === guide.runes.secondarySlots.first
                     );
                     this.secondSecondaryRune = runesArray.find(
                        (rune) => rune.key === guide.runes.secondarySlots.second
                     );
                     this.thirdSecondaryRune = runesArray.find(
                        (rune) => rune.key === guide.runes.secondarySlots.third
                     );
                  });
               this.ddHandler
                  .getSpells()
                  .pipe(take(1))
                  .subscribe((response: SpellResponse) => {
                     const spells = Object.values(response.data);
                     this.firstSpell = spells.find(
                        (spell) => guide.spells.first === spell.id
                     );
                     this.secondSpell = spells.find(
                        (spell) => guide.spells.second === spell.id
                     );
                  });
               this.ddHandler
                  .getItems()
                  .pipe(take(1))
                  .subscribe(
                     (response: ItemResponse) => (this.items = response.data)
                  );
            });
      });
   }
}
