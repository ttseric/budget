import { TestBed } from '@angular/core/testing';

import { RebuildBudgetTermService } from './rebuild-budget-item.service';

describe('RebuildBudgetTermService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RebuildBudgetTermService = TestBed.get(RebuildBudgetTermService);
    expect(service).toBeTruthy();
  });
});
