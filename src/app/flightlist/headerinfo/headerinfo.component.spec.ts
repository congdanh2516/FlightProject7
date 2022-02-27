import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderinfoComponent } from './headerinfo.component';

describe('HeaderinfoComponent', () => {
  let component: HeaderinfoComponent;
  let fixture: ComponentFixture<HeaderinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
