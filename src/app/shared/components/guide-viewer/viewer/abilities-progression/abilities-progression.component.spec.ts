import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AbilitiesProgressionComponent } from './abilities-progression.component';

describe('AbilitiesProgressionComponent', () => {
  let component: AbilitiesProgressionComponent;
  let fixture: ComponentFixture<AbilitiesProgressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbilitiesProgressionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AbilitiesProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
