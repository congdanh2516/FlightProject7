import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedserviceComponent } from './expandedservice.component';

describe('ExpandedserviceComponent', () => {
  let component: ExpandedserviceComponent;
  let fixture: ComponentFixture<ExpandedserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandedserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
