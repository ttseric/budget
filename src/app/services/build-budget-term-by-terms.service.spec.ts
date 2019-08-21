import { TestBed } from '@angular/core/testing';

import { BuildBudgetTermByTermsService } from './build-budget-term-by-terms.service';

describe('BuildBudgetTermByTermsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildBudgetTermByTermsService = TestBed.get(BuildBudgetTermByTermsService);
    expect(service).toBeTruthy();
  });
});
