import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarEmpleadosComponent } from './registar-empleados.component';

describe('RegistarEmpleadosComponent', () => {
  let component: RegistarEmpleadosComponent;
  let fixture: ComponentFixture<RegistarEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistarEmpleadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistarEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
