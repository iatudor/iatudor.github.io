import { TestBed } from '@angular/core/testing';

import { FirebaseDBService } from './firebase-db.service';

describe('FirebaseDBService', () => {
  let service: FirebaseDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
