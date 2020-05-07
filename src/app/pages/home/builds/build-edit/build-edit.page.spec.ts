import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildEditPage } from './build-edit.page';

describe('BuildEditPage', () => {
  let component: BuildEditPage;
  let fixture: ComponentFixture<BuildEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
