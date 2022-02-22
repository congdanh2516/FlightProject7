import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchnbookComponent } from './searchnbook.component';

describe('SearchnbookComponent', () => {
  let component: SearchnbookComponent;
  let fixture: ComponentFixture<SearchnbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchnbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchnbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
