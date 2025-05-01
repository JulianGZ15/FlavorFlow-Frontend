import { Component, OnInit } from '@angular/core';
import { MesasService } from '../../services/mesas.service';
import { RouterModule } from '@angular/router';
import { RegistrarMesasComponent } from '../registrar-mesas/registrar-mesas.component';
import { ToastrService } from 'ngx-toastr';
import { Mesas } from '../../models/mesas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-listar-mesas',
  standalone: true,
  imports: [
    RouterModule,
    RegistrarMesasComponent,
  ],
  templateUrl: './listar-mesas.component.html',
  styleUrl: './listar-mesas.component.css'
})
export class ListarMesasComponent implements OnInit {

  
  mesas:Mesas[]=[];

  constructor(private service: MesasService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getMesas();
  }

  getMesas(): void {
    this.service.getMesas().subscribe(data => {
      this.mesas = data;
    });
  }



  deleteMesa(cve_mesa: number): void {
    this.service.deleteMesa(cve_mesa).subscribe(data => {
      this.toastr.error('La mesa fue eliminado con éxito', 'Mesa eliminada');
      this.getMesas(); // Actualizar la lista de mesas después de eliminar uno
    });
  }


  generarPDF() {
    const doc = new jsPDF();
    
    const mesas = this.mesas
    // Encabezado
    doc.setFontSize(18);
    doc.text('LISTADO DE MESAS', 105, 20, { align: 'center' });

    // Configurar los datos de la tabla
    const data = mesas.map(mesa => [
      mesa.num_mesa,
      mesa.asientos,
      mesa.zona.nombre
    ]);

    // Configurar el encabezado de la tabla
    const headers = ['Num Mesa', 'Num Asientos', 'Zona'];

    // Generar la tabla
    autoTable(
      
      doc,{
      startY: 30,
      theme: 'grid',
      head: [headers],
      body: data,
      styles: { fontSize: 12,},
      margin: { top: 20 },
      columnStyles: { 0: { cellWidth: 20 }, 1: { cellWidth: 25 }, 2: { cellWidth: 20 }, }
    }
  );

    // Guardar o descargar PDF
    doc.save('mesas.pdf');
  }

}
