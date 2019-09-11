import { TestBed } from '@angular/core/testing';

import { AlignRfpPeriodWithTermChangeService } from './align-rfp-period-with-term-change.service';

describe('AlignRfpPeriodWithTermChangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlignRfpPeriodWithTermChangeService = TestBed.get(AlignRfpPeriodWithTermChangeService);
    expect(service).toBeTruthy();
  });
});
