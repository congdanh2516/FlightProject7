import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowtobookComponent } from './howtobook.component';

describe('HowtobookComponent', () => {
  let component: HowtobookComponent;
  let fixture: ComponentFixture<HowtobookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowtobookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowtobookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
