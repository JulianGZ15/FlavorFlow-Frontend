import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearZonasComponent } from './crear-zonas.component';

describe('CrearZonasComponent', () => {
  let component: CrearZonasComponent;
  let fixture: ComponentFixture<CrearZonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearZonasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
