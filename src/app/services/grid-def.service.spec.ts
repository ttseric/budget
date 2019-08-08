import { TestBed } from '@angular/core/testing';

import { GridDefService } from './grid-def.service';

describe('GridDefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridDefService = TestBed.get(GridDefService);
    expect(service).toBeTruthy();
  });
});
