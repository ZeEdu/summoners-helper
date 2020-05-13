import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildViewPage } from './build-view.page';

describe('BuildViewPage', () => {
  let component: BuildViewPage;
  let fixture: ComponentFixture<BuildViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
