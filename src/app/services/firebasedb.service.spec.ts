import { TestBed } from '@angular/core/testing';

import { FirebasedbService } from './firebasedb.service';

describe('FirebasedbService', () => {
  let service: FirebasedbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebasedbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
