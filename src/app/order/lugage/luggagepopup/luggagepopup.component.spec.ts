import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuggagepopupComponent } from './luggagepopup.component';

describe('LuggagepopupComponent', () => {
  let component: LuggagepopupComponent;
  let fixture: ComponentFixture<LuggagepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuggagepopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuggagepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
