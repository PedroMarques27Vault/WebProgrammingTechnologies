import { TestBed } from '@angular/core/testing';

import { DRFService } from './drf.service';

describe('DRFService', () => {
  let service: DRFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DRFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
