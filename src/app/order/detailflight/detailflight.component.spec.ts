import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailflightComponent } from './detailflight.component';

describe('DetailflightComponent', () => {
  let component: DetailflightComponent;
  let fixture: ComponentFixture<DetailflightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailflightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailflightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
