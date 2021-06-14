import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { catchError, retry, take } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { Observable } from 'rxjs';
import { ScreenSizeService } from 'src/app/services/screensize.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public profile: Observable<UserProfile>;
  public isLoading: boolean;
  public connectionSuccess: boolean;
  public isDesktop: boolean;

  constructor(
    private authService: AuthService,
    private afa: AngularFireAuth,
    private userManager: UserManagerService,
    private screenSizeService: ScreenSizeService
  ) {}

  public reloadData(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;
    this.afa.user
      .pipe(
        take(1),
        retry(2),
        catchError((_) => {
          this.connectionSuccess = false;
          throw new Error('Could not estabilish connection.');
        })
      )
      .subscribe((user: firebase.User) => {
        user
          .getIdToken()
          .then((token: string) => {
            try {
              this.profile = this.userManager
                .getUserProfileByUID(user.uid, token)
                .pipe(
                  take(1),
                  retry(2),
                  catchError((_) => {
                    this.connectionSuccess = false;
                    throw new Error('Error in server. ');
                  })
                );
              this.connectionSuccess = true;
            } catch (error) {
              console.log('Enter Catch');
            }
          })
          .catch((err) => {
            this.connectionSuccess = false;
            console.log('Error');
          })
          .finally(() => (this.isLoading = false));
      });
  }

  ngOnInit(): void {
    this.loadData();

    this.screenSizeService.isDesktopView().subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
  }

  public logout() {
    this.authService.logout();
  }
}
