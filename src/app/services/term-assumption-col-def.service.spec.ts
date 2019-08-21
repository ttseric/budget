import { TestBed } from '@angular/core/testing';

import { TermAssumptionColDefService } from './term-assumption-col-def.service';

describe('TermAssumptionColDefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TermAssumptionColDefService = TestBed.get(TermAssumptionColDefService);
    expect(service).toBeTruthy();
  });
});
