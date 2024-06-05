/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnimationService } from './animation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Animation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimationService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([AnimationService], (service: AnimationService) => {
    expect(service).toBeTruthy();
  }));
});
