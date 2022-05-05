import { TestBed } from '@angular/core/testing';

import { AMainService } from './a-main.service';

describe('AMainServiceService', () => {
  let service: AMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
