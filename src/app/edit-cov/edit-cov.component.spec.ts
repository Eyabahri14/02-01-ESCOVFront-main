import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCovComponent } from './edit-cov.component';

describe('EditCovComponent', () => {
  let component: EditCovComponent;
  let fixture: ComponentFixture<EditCovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCovComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
