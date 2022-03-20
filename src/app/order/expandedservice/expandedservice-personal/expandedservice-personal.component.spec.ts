import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedservicePersonalComponent } from './expandedservice-personal.component';

describe('ExpandedservicePersonalComponent', () => {
  let component: ExpandedservicePersonalComponent;
  let fixture: ComponentFixture<ExpandedservicePersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandedservicePersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedservicePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
