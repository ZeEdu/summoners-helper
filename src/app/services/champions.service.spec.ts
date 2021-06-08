import { TestBed } from '@angular/core/testing';

import { ChampionsService } from './champions.service';

describe('ChampionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChampionsService = TestBed.get(ChampionsService);
    expect(service).toBeTruthy();
  });
});
