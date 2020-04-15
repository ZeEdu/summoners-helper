import { TestBed } from '@angular/core/testing';

import { BuildServiceService } from './build-service.service';

describe('BuildServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildServiceService = TestBed.get(BuildServiceService);
    expect(service).toBeTruthy();
  });
});
