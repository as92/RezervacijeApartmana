/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SobeservisService } from './sobeservis.service';

describe('Service: Sobeservis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SobeservisService]
    });
  });

  it('should ...', inject([SobeservisService], (service: SobeservisService) => {
    expect(service).toBeTruthy();
  }));
});
