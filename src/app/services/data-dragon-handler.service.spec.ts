import { TestBed } from '@angular/core/testing';

import { DataDragonHandlerService } from './data-dragon-handler.service';

describe('DataDragonHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataDragonHandlerService = TestBed.get(DataDragonHandlerService);
    expect(service).toBeTruthy();
  });
});
