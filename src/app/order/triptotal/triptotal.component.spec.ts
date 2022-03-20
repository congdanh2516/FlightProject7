import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriptotalComponent } from './triptotal.component';

describe('TriptotalComponent', () => {
  let component: TriptotalComponent;
  let fixture: ComponentFixture<TriptotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriptotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TriptotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
