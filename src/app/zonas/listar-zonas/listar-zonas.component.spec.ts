import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarZonasComponent } from './listar-zonas.component';

describe('ListarZonasComponent', () => {
  let component: ListarZonasComponent;
  let fixture: ComponentFixture<ListarZonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarZonasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
