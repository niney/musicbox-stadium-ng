import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubBbsListComponent } from './club-bbs-list.component';

describe('ClubBbsListComponent', () => {
  let component: ClubBbsListComponent;
  let fixture: ComponentFixture<ClubBbsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubBbsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubBbsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
