import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { RouterModule } from '@angular/router';
import { RegistarEmpleadosComponent } from '../registar-empleados/registar-empleados.component';
import { ToastrService } from 'ngx-toastr';
import { Empleados } from '../../models/empleados';
import { NgxExtendedPdfViewerComponent, NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';



@Component({
  selector: 'app-listar-empleados',
  standalone: true,
  imports: [
    RouterModule,
    RegistarEmpleadosComponent,
    NgxExtendedPdfViewerModule,
    
  ],
  templateUrl: './listar-empleados.component.html',
  styleUrl: './listar-empleados.component.css',
  
})

export class ListarEmpleadosComponent implements OnInit {


  empleados:Empleados[]=[];

  constructor(private service: EmpleadosService, private toastr: ToastrService, ) {}

  ngOnInit(): void {
    this.getEmpleado();
  }

  getEmpleado(): void {
    this.service.getEmpleados().subscribe(data => {
      this.empleados = data;
    });
  }



  deleteEmpleado(cve_mesa: number): void {
    this.service.deleteEmpleado(cve_mesa).subscribe(data => {
      this.toastr.error('El empleados fue eliminado con éxito', 'empleados eliminado');
      this.getEmpleado(); // Actualizar la lista de mesas después de eliminar uno
    });
  }


  generarPDF() {
    const doc = new jsPDF();
    
    const empleados = this.empleados
    // Encabezado
    doc.setFontSize(18);
    doc.text('LISTADO DE EMPLEADOS', 105, 20, { align: 'center' });

    // Configurar los datos de la tabla
    const data = empleados.map(empleados => [
      empleados.nombre,
      empleados.paterno,
      empleados.materno,
      empleados.edad,
      empleados.fecha_contratacion.toString(),
      empleados.puesto.nombre
    ]);

    // Configurar el encabezado de la tabla
    const headers = ['Nombre', 'A.paterno', 'A.materno', 'Edad', 'Fecha de contrataion', 'Puesto'];

    // Generar la tabla
    autoTable(
      
      doc,{
      startY: 30,
      theme: 'grid',
      head: [headers],
      body: data,
      styles: { fontSize: 12,},
      margin: { top: 20 },
      columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 30 }, 2: { cellWidth: 30 }, 3: { cellWidth: 20 }, 
      4: { cellWidth: 30 }, 5: { cellWidth: 30 } }
    }
  );

    // Guardar o descargar PDF
    doc.save('empleadoss.pdf');
  }



}
