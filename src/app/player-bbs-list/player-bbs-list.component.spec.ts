import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBbsListComponent } from './player-bbs-list.component';

describe('PlayerBbsListComponent', () => {
  let component: PlayerBbsListComponent;
  let fixture: ComponentFixture<PlayerBbsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerBbsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBbsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
