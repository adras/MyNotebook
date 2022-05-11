import { TestBed } from '@angular/core/testing';

import { WindowResizeService } from './windowResize.service';

describe('WindowService', () => {
  let service: WindowResizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowResizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
