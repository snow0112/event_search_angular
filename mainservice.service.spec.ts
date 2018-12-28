import { TestBed } from '@angular/core/testing';

import { MainserviceService } from './mainservice.service';

describe('MainserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainserviceService = TestBed.get(MainserviceService);
    expect(service).toBeTruthy();
  });
});
