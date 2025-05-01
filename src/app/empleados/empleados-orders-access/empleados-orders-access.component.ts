import { Component, NgModule } from '@angular/core';
import { Empleados } from '../../models/empleados';
import { EmpleadosService } from '../../services/empleados.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-empleados-orders-access',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
    
  ],
  templateUrl: './empleados-orders-access.component.html',
  styleUrl: './empleados-orders-access.component.css'
})
export class EmpleadosOrdersAccessComponent {
  id: string | null = null;
  empleado: Empleados | null = null; // Declarar una variable para almacenar un solo empleado
  nipIngresado: any;

  constructor(private service: EmpleadosService, 
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router) {

              }




  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Obtener el ID del empleado desde la ruta
    if (this.id !== null) {
      this.service.getEmpleadosById(this.id).subscribe(data => {
        this.empleado=data ; // Asignar los datos del empleado a la variable
      });
    }
  }



  
  verificarNIP(nip: number): void {
    if (this.id !== null) {
      console.log("id: ", this.id, " nip: ", nip)
    this.service.verificarNIP(this.id, nip).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/orders/mesas');
      } else {
        this.toastr.error("El nip no es valido. Intenta de nuevo")
      }
    });
  }
  }
}
