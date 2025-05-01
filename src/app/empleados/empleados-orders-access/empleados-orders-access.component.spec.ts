import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosOrdersAccessComponent } from './empleados-orders-access.component';

describe('EmpleadosOrdersAccessComponent', () => {
  let component: EmpleadosOrdersAccessComponent;
  let fixture: ComponentFixture<EmpleadosOrdersAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosOrdersAccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleadosOrdersAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
