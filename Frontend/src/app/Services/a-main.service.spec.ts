import { TestBed } from '@angular/core/testing';

import { AMainServiceService } from './a-main.service';

describe('AMainServiceService', () => {
  let service: AMainServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AMainServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
