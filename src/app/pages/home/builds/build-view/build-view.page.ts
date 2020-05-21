import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildManagerService } from '../../../../services/build-manager.service';
import { Guide, Runes } from '../../../../interfaces/build';
import { PathResponse } from '../../../../interfaces/runes';
import { Champion, ChampionsResponse } from '../../../../interfaces/champions';
import { Spell, SpellResponse } from '../../../../interfaces/spells';
import { Item, ItemsResponse } from '../../../../interfaces/items';
import { DataDragonHandlerService } from '../../../../services/data-dragon-handler.service';

@Component({
  selector: 'app-build-view',
  templateUrl: './build-view.page.html',
  styleUrls: ['./build-view.page.scss'],
})
export class BuildViewPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
  };
  public guide: Guide;
  public paths: PathResponse[];
  public champion: Champion;
  public spells: Spell[];
  public items: Item[];
  constructor(
    private ddHandler: DataDragonHandlerService,
    private route: ActivatedRoute,
    private buildService: BuildManagerService
  ) {}

  ngOnInit() {
    this.buildService
      .getBuildByID(this.route.snapshot.paramMap.get('id'))
      .subscribe((guide: Guide) => {
        // Load Guide
        this.guide = guide;
        console.log(this.guide);

        // Load Assets
        //   this.ddHandler
        //     .getChampions()
        //     .subscribe(
        //       (response: ChampionsResponse) =>
        //         (this.champion = response.data[guide.champ])
        //     );

        //   this.ddHandler.getRunes().subscribe(
        //     (response: Array<PathResponse>) =>
        //       (this.paths = response.filter((r: PathResponse) => {
        //         return (
        //           r.key === guide.runes.primaryRune || guide.runes.secondaryRune
        //         );
        //       }))
        //   );
        //   this.ddHandler
        //     .getSpells()
        //     .subscribe(
        //       (response: SpellResponse) =>
        //         (this.spells = Object.values(response.data))
        //     );
        //   this.ddHandler
        //     .getItems()
        //     .subscribe(
        //       (response: ItemsResponse) =>
        //         (this.items = Object.values(response.data))
        //     );
      });
  }
}
