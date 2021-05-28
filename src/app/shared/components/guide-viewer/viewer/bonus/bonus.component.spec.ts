import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BonusComponent } from './bonus.component';

describe('BonusComponent', () => {
  let component: BonusComponent;
  let fixture: ComponentFixture<BonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
