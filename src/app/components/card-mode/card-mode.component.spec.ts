import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModeComponent } from './card-mode.component';

describe('CardModeComponent', () => {
  let component: CardModeComponent;
  let fixture: ComponentFixture<CardModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
