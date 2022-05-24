import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplanecardComponent } from './airplanecard.component';

describe('AirplanecardComponent', () => {
  let component: AirplanecardComponent;
  let fixture: ComponentFixture<AirplanecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirplanecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplanecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
