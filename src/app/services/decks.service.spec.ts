import { TestBed } from '@angular/core/testing';

import { DecksService } from './decks.service';

describe('DecksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecksService = TestBed.get(DecksService);
    expect(service).toBeTruthy();
  });
});
