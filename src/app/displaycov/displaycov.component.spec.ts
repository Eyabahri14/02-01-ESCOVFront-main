import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaycovComponent } from './displaycov.component';

describe('DisplaycovComponent', () => {
  let component: DisplaycovComponent;
  let fixture: ComponentFixture<DisplaycovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaycovComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaycovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
