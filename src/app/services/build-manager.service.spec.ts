import { TestBed } from '@angular/core/testing';

import { BuildManagerService } from './build-manager.service';

describe('BuildManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildManagerService = TestBed.get(BuildManagerService);
    expect(service).toBeTruthy();
  });
});
