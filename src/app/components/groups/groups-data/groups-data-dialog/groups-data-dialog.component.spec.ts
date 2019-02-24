import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsDataDialogComponent } from './groups-data-dialog.component';

describe('GroupsDataDialogComponent', () => {
  let component: GroupsDataDialogComponent;
  let fixture: ComponentFixture<GroupsDataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
