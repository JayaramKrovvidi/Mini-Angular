import { TestBed } from '@angular/core/testing';

import { ExecutionResultsService } from './execution-results.service';

describe('ExecutionResultsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExecutionResultsService = TestBed.get(ExecutionResultsService);
    expect(service).toBeTruthy();
  });
});
