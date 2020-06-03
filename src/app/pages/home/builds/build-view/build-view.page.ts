import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildManagerService } from '../../../../services/build-manager.service';
import { Guide, Runes } from '../../../../interfaces/build';
import { PathResponse, PathRune } from '../../../../interfaces/runes';
import { Champion, ChampionResponse } from '../../../../interfaces/champions';
import { Spell, SpellResponse } from '../../../../interfaces/spells';
import { Item, ItemResponse } from '../../../../interfaces/items';
import { DataDragonHandlerService } from '../../../../services/data-dragon-handler.service';
import { IonSlides } from '@ionic/angular';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';

@Component({
   selector: 'app-build-view',
   templateUrl: './build-view.page.html',
   styleUrls: ['./build-view.page.scss'],
})
export class BuildViewPage implements OnInit {
   @ViewChild(IonSlides, { static: false }) slides: IonSlides;
   slideOpts = {
      initialSlide: 4,
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

   constructor(
      private ddHandler: DataDragonHandlerService,
      private route: ActivatedRoute,
      private buildService: BuildManagerService,
      private UserManager: UserManagerService,
      public safeHtml: SafeHtmlPipe
   ) {}

   ngOnInit() {
      this.buildService
         .getBuildByID(this.route.snapshot.paramMap.get('id'))
         .subscribe((guide: Guide) => {
            // Load Guide
            this.guide = guide;
            console.log(this.guide.bonus);
            const abilitiesArray = Object.values(guide.abilitiesProgression);
            this.abilitiesProgression = abilitiesArray;

            // Get Creator username
            this.UserManager.getUsernameByUID(guide.userUID).subscribe(
               (creatorUsername: string) =>
                  (this.guideCreatorUsername = creatorUsername)
            );

            //   Load Assets
            this.ddHandler
               .getChampions()
               .subscribe(
                  (response: ChampionResponse) =>
                     (this.champions = response.data)
               );
            this.ddHandler
               .getRunes()
               .subscribe((response: Array<PathResponse>) => {
                  // Fetch data
                  this.primaryPathData = response.find(
                     (path) => path.key === guide.runes.primaryRune
                  );
                  this.secondaryPathData = response.find(
                     (path) => path.key === guide.runes.secondaryRune
                  );
                  // Load all runes to a array
                  const runesArray = [];
                  response.forEach((r: PathResponse) => {
                     r.slots.forEach((runes) =>
                        runes.runes.forEach((key) => runesArray.push(key))
                     );
                  });

                  // Assign runes to public variables
                  //// Primary Rune
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

                  //// Secondary Rune
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

            this.ddHandler.getSpells().subscribe((response: SpellResponse) => {
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
               .subscribe(
                  (response: ItemResponse) => (this.items = response.data)
               );
         });
   }
}
