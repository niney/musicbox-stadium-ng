import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBbsFormComponent } from './player-bbs-form.component';

describe('PlayerBbsFormComponent', () => {
  let component: PlayerBbsFormComponent;
  let fixture: ComponentFixture<PlayerBbsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerBbsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBbsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
