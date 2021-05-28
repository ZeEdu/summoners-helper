import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuideViewerComponent } from './guide-viewer.component';

describe('GuideViewerComponent', () => {
  let component: GuideViewerComponent;
  let fixture: ComponentFixture<GuideViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GuideViewerComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GuideViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
