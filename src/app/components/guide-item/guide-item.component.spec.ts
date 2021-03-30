import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuideItemComponent } from './guide-item.component';

describe('GuideItemComponent', () => {
  let component: GuideItemComponent;
  let fixture: ComponentFixture<GuideItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuideItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
