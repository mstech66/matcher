import { TestBed } from '@angular/core/testing';

import { TinkerService } from './tinker.service';

describe('TinkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TinkerService = TestBed.get(TinkerService);
    expect(service).toBeTruthy();
  });
});
