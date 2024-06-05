/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompteService } from './compte.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Compte', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompteService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([CompteService], (service: CompteService) => {
    expect(service).toBeTruthy();
  }));
});
