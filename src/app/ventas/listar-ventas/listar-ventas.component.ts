import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { VentasService } from '../../services/ventas.service';
import { Venta } from '../../models/ventas';


@Component({
  selector: 'app-listar-ventas',
  standalone: true,
  imports: [],
  templateUrl: './listar-ventas.component.html',
  styleUrl: './listar-ventas.component.css'
})
export class ListarVentasComponent implements OnInit {


  ventas:Venta[]=[];

  constructor(private service: VentasService ) {}

  ngOnInit(): void {
    this.getVentas();
  }

  getVentas(): void {
    this.service.getVentas().subscribe(data => {
      this.ventas = data;
    });
  }





  generarPDF() {
    const doc = new jsPDF();
    
    const venta = this.ventas
    // Encabezado
    doc.setFontSize(18);
    doc.text('LISTADO DE VENTAS', 105, 20, { align: 'center' });

    // Configurar los datos de la tabla
    const data = venta.map(venta => [
      venta.mesa.num_mesa,
      venta.mesa.zona.nombre,
      venta.fecha.toString(),
      venta.importe,
      venta.iva,
      venta.total,
    ]);

    // Configurar el encabezado de la tabla
    const headers = ['Num Mesa', 'Zona mesa', 'Fecha de la venta', 'Importe', 'IVA', 'Total'];

    // Generar la tabla
    autoTable(
      
      doc,{
      startY: 30,
      theme: 'grid',
      head: [headers],
      body: data,
      styles: { fontSize: 12,},
      margin: { top: 20 },
      columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 20 }, 2: { cellWidth: 30 }, 3: { cellWidth: 20 }, 
      4: { cellWidth: 20 }, 5: { cellWidth: 20 } }
    }
  );

    // Guardar o descargar PDF
    doc.save('ventas.pdf');
  }



}