import { TestBed } from '@angular/core/testing';

import { DateRangeMDService } from './date-range-md.service';

describe('DateRangeMDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateRangeMDService = TestBed.get(DateRangeMDService);
    expect(service).toBeTruthy();
  });
});
