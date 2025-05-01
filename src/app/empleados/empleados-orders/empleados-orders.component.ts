import { Component } from '@angular/core';
import { Empleados } from '../../models/empleados';
import { EmpleadosService } from '../../services/empleados.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-empleados-orders',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

  ],
  templateUrl: './empleados-orders.component.html',
  styleUrl: './empleados-orders.component.css'
})
export class EmpleadosOrdersComponent {

  empleados: Empleados[] = [];

  constructor(private service: EmpleadosService, 
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.getEmpleado();
  }

  getEmpleado(): void {
    this.service.getEmpleados().subscribe(data => {
      this.empleados = data;
    });
  }

  acceder(id: number){

    this.router.navigateByUrl('/orders/empleados_access/'+ id);


  }

  
}
