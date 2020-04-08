import { TestBed } from '@angular/core/testing';

import { GetChampionsService } from './get-champions.service';

describe('GetChampionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetChampionsService = TestBed.get(GetChampionsService);
    expect(service).toBeTruthy();
  });
});
