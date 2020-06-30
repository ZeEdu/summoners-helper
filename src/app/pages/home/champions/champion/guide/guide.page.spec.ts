import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidePage } from './guide.page';

describe('GuidePage', () => {
  let component: GuidePage;
  let fixture: ComponentFixture<GuidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
