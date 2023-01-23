import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcovComponent } from './addcov.component';

describe('AddcovComponent', () => {
  let component: AddcovComponent;
  let fixture: ComponentFixture<AddcovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcovComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
