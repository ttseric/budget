import { TestBed } from '@angular/core/testing';

import { ColDefService } from './col-def.service';

describe('ColDefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColDefService = TestBed.get(ColDefService);
    expect(service).toBeTruthy();
  });
});
