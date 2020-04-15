import { Component, OnInit } from '@angular/core';
import { Builds } from 'src/app/interfaces/get-builds';
import { BuildManagerService } from 'src/app/services/build-manager.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.page.html',
  styleUrls: ['./builds.page.scss'],
})
export class BuildsPage implements OnInit {
  public userBuilds: Array<Builds> = [];
  constructor(
    private buildService: BuildManagerService,
    private afa: AngularFireAuth
  ) {}

  ngOnInit() {
    this.afa.user.subscribe((user) => {
      if (!user.isAnonymous) {
        this.buildService
          .getBuildByUserUID(user.uid)
          .subscribe((response: Array<Builds>) => (this.userBuilds = response));
      }
    });
  }
}
