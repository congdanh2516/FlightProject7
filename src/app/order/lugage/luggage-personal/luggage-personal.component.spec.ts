import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuggagePersonalComponent } from './luggage-personal.component';

describe('LuggagePersonalComponent', () => {
  let component: LuggagePersonalComponent;
  let fixture: ComponentFixture<LuggagePersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuggagePersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuggagePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
