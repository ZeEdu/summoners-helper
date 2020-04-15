import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildModellingPage } from './build-modelling.page';

describe('BuildModellingPage', () => {
  let component: BuildModellingPage;
  let fixture: ComponentFixture<BuildModellingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildModellingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildModellingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
