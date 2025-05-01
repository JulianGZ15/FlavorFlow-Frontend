import { Component, OnInit } from '@angular/core';
import { Empleados } from '../../models/empleados';
import { EmpleadosService } from '../../services/empleados.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-detalle-empleado',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,


  ],
  templateUrl: './detalle-empleado.component.html',
  styleUrl: './detalle-empleado.component.css'
})
export class DetalleEmpleadoComponent implements OnInit {

  id: string | null = null;
  empleado: Empleados | null = null; // Declarar una variable para almacenar un solo empleado

  constructor(private service: EmpleadosService, 
              private toastr: ToastrService,
              private route: ActivatedRoute) {

              }




  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Obtener el ID del empleado desde la ruta
    if (this.id !== null) {
      this.service.getEmpleadosById(this.id).subscribe(data => {
        this.empleado=data ; // Asignar los datos del empleado a la variable
        console.log(this.empleado); // Imprimir el empleado en la consola
      });
    }
  }

  generarPdf(){
    const elemento:any = document.getElementById('informacionEmpleado')

    html2canvas(elemento, {scale: 2}).then((canvas)=>{

      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG',0,0,211,298);

      pdf.setProperties({
        title : 'Reporte de empleado',
        author: 'FlavorFlow'
      });
      pdf.setFontSize(12);
      pdf.text('Reporte de empleado', 14,22);
      pdf.save('reporte de empleado Flavorflow')
      
    }
    )
  }


}
