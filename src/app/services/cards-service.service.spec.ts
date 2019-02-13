import { TestBed } from '@angular/core/testing';

import { CardsServiceService } from './cards-service.service';

describe('CardsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardsServiceService = TestBed.get(CardsServiceService);
    expect(service).toBeTruthy();
  });
});
