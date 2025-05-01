import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPuestosComponent } from './crear-puestos.component';

describe('CrearPuestosComponent', () => {
  let component: CrearPuestosComponent;
  let fixture: ComponentFixture<CrearPuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPuestosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearPuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
