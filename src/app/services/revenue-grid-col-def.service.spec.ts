import { TestBed } from '@angular/core/testing';

import { RevenueGridColDefService } from './revenue-grid-col-def.service';

describe('RevenueGridColDefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RevenueGridColDefService = TestBed.get(RevenueGridColDefService);
    expect(service).toBeTruthy();
  });
});
