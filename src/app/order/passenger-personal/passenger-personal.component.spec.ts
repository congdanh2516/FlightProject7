import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerPersonalComponent } from './passenger-personal.component';

describe('PassengerPersonalComponent', () => {
  let component: PassengerPersonalComponent;
  let fixture: ComponentFixture<PassengerPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
