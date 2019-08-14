import { TestBed } from '@angular/core/testing';

import { BuildTermDetailService } from './build-term-detail.service';

describe('BuildTermDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildTermDetailService = TestBed.get(BuildTermDetailService);
    expect(service).toBeTruthy();
  });
});
