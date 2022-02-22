import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoginterfaceComponent } from './dialoginterface.component';

describe('DialoginterfaceComponent', () => {
  let component: DialoginterfaceComponent;
  let fixture: ComponentFixture<DialoginterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoginterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoginterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
