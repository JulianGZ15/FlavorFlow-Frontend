import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosOrdersComponent } from './empleados-orders.component';

describe('EmpleadosOrdersComponent', () => {
  let component: EmpleadosOrdersComponent;
  let fixture: ComponentFixture<EmpleadosOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleadosOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
