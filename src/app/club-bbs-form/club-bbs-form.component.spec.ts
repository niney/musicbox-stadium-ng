import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubBbsFormComponent } from './club-bbs-form.component';

describe('ClubBbsFormComponent', () => {
  let component: ClubBbsFormComponent;
  let fixture: ComponentFixture<ClubBbsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubBbsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubBbsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
