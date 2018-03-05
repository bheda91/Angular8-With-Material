import { TestBed, inject } from '@angular/core/testing';

import { CanLoadModuleService } from './can-load-module.service';

describe('CanLoadModuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanLoadModuleService]
    });
  });

  it('should be created', inject([CanLoadModuleService], (service: CanLoadModuleService) => {
    expect(service).toBeTruthy();
  }));
});
