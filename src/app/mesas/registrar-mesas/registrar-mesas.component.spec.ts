import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMesasComponent } from './registrar-mesas.component';

describe('RegistrarMesasComponent', () => {
  let component: RegistrarMesasComponent;
  let fixture: ComponentFixture<RegistrarMesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarMesasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
