import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOrdersComponent } from './auth-orders.component';

describe('AuthOrdersComponent', () => {
  let component: AuthOrdersComponent;
  let fixture: ComponentFixture<AuthOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
