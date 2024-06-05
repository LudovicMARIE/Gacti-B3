/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActivityService } from './activity.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Activity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([ActivityService], (service: ActivityService) => {
    expect(service).toBeTruthy();
  }));
});
