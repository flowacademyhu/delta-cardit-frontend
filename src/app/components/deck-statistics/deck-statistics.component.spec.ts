import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckStatisticsComponent } from './deck-statistics.component';

describe('DeckStatisticsComponent', () => {
  let component: DeckStatisticsComponent;
  let fixture: ComponentFixture<DeckStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
