/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SessionService } from './session.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Session', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([SessionService], (service: SessionService) => {
    expect(service).toBeTruthy();
  }));
});
