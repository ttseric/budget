import { TestBed } from '@angular/core/testing';

import { RebuildBudgetItemService } from './rebuild-budget-item.service';

describe('RebuildBudgetItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RebuildBudgetItemService = TestBed.get(RebuildBudgetItemService);
    expect(service).toBeTruthy();
  });
});
