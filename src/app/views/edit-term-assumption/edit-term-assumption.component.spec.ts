import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTermAssumptionComponent } from './edit-term-assumption.component';

describe('EditTermAssumptionComponent', () => {
  let component: EditTermAssumptionComponent;
  let fixture: ComponentFixture<EditTermAssumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTermAssumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTermAssumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
