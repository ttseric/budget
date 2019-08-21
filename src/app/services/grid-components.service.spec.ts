import { TestBed } from '@angular/core/testing';

import { GridComponentsService } from './grid-components.service';

describe('GridComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridComponentsService = TestBed.get(GridComponentsService);
    expect(service).toBeTruthy();
  });
});
