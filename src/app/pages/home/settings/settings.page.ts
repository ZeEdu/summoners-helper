import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { retry, switchMap, tap } from 'rxjs/operators';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { forkJoin, from, Observable, of } from 'rxjs';
import { ScreenSizeService } from 'src/app/services/screensize.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public profile$: Observable<UserProfile>;
  public isDesktop$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private afa: AngularFireAuth,
    private userManager: UserManagerService,
    private screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.isDesktop$ = this.screenSizeService.isDesktopView();
  }

  public reloadData(): void {
    this.loadData();
  }

  private loadData(): void {
    this.profile$ = this.afa.user.pipe(
      switchMap((user: firebase.User) =>
        forkJoin({ token: from(user.getIdToken()), uid: of(user.uid) })
      ),
      switchMap(({ token, uid }) =>
        this.userManager.getUserProfileByUID(uid, token).pipe(retry(2))
      )
    );
  }

  public logout() {
    this.authService.logout();
  }
}
