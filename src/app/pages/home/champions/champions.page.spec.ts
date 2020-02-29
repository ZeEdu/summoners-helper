import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionsPage } from './champions.page';

describe('ChampionsPage', () => {
  let component: ChampionsPage;
  let fixture: ComponentFixture<ChampionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
