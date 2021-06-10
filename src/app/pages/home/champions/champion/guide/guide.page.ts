import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildManagerService } from '../../../../../services/build-manager.service';
import { IonContent } from '@ionic/angular';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';
import { AngularFireAuth } from '@angular/fire/auth';
import { retry, take } from 'rxjs/operators';
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
    this.content.scrollToTop(1);
  }
}
