import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RuneComponent } from './rune.component';

describe('RuneComponent', () => {
  let component: RuneComponent;
  let fixture: ComponentFixture<RuneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuneComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
