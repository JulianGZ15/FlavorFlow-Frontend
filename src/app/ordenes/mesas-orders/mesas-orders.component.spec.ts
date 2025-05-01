import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasOrdersComponent } from './mesas-orders.component';

describe('MesasOrdersComponent', () => {
  let component: MesasOrdersComponent;
  let fixture: ComponentFixture<MesasOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesasOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesasOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
