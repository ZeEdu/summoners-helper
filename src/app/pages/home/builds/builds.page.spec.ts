import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildsPage } from './builds.page';

describe('BuildsPage', () => {
  let component: BuildsPage;
  let fixture: ComponentFixture<BuildsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
