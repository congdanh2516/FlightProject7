import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LugageComponent } from './lugage.component';

describe('LugageComponent', () => {
  let component: LugageComponent;
  let fixture: ComponentFixture<LugageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LugageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LugageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
