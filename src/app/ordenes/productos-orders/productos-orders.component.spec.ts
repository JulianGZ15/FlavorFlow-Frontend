import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosOrdersComponent } from './productos-orders.component';

describe('ProductosOrdersComponent', () => {
  let component: ProductosOrdersComponent;
  let fixture: ComponentFixture<ProductosOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
