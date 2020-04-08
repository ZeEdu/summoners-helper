import { TestBed } from '@angular/core/testing';

import { GetPatchService } from './get-patch.service';

describe('GetPatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetPatchService = TestBed.get(GetPatchService);
    expect(service).toBeTruthy();
  });
});
