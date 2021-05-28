import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BonusItemComponent } from './bonus-item.component';

describe('BonusItemComponent', () => {
  let component: BonusItemComponent;
  let fixture: ComponentFixture<BonusItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BonusItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
