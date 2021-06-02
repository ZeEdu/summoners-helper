import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { Builds } from 'src/app/interfaces/get-builds';
import { BuildManagerService } from 'src/app/services/build-manager.service';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss'],
})
export class GuidesComponent implements OnInit {
  @Input() championId: string;

  public builds: Array<Builds> = [];
  public loadedAll: boolean;
  page: number;

  constructor(
    private buildService: BuildManagerService,
    private afa: AngularFireAuth
  ) {}

  ngOnInit() {
    this.loadGuides();
  }

  public loadGuides(loadMore = false, event?: any) {
    if (loadMore) this.page++;
    if (!this.loadedAll) {
      this.afa.idToken.subscribe((token) => {
        if (token) {
          this.buildService
            .getBuildByChampionID(this.championId, token, this.page)
            .pipe(take(1))
            .subscribe((response: Array<Builds>) => {
              if (response.length < 10) this.loadedAll = true;
              this.builds = [...this.builds, ...response];
            });
        }
      });
    }

    if (event) {
      event.target.complete();
    }
  }
}
