import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomicilioRestauranteComponent } from './domicilio-restaurante.component';

describe('DomicilioRestauranteComponent', () => {
  let component: DomicilioRestauranteComponent;
  let fixture: ComponentFixture<DomicilioRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomicilioRestauranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomicilioRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
