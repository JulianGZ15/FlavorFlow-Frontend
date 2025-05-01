import { Component, OnInit } from '@angular/core';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { ProductoService } from '../../services/productos.service';
import { Productos } from '../../models/productos';
import { RouterModule } from '@angular/router';
import { CrearProductoComponent } from '../crear-producto/crear-producto.component';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-listar-producto',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenav,
    MatSidenavModule,
    CrearProductoComponent,
    
  ],
  templateUrl: './listar-producto.component.html',
  styleUrl: './listar-producto.component.css'
})
export class ListarProductoComponent implements OnInit {
  productos: Productos[] = [];

  constructor(private service: ProductoService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.service.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  addProducto(producto: Productos): void {
    this.productos.push(producto);
  }

  deleteProducto(cve_producto: number): void {
    this.service.deleteProducto(cve_producto).subscribe(data => {
      this.toastr.error('El producto fue eliminado con éxito', 'Producto eliminado');
      this.getProductos(); // Actualizar la lista de productos después de eliminar uno
    });
  }


  
  generarPDF() {
    const doc = new jsPDF();
    
    const productos = this.productos
    // Encabezado
    doc.setFontSize(18);
    doc.text('LISTADO DE PRODUCTOS', 105, 20, { align: 'center' });

    // Configurar los datos de la tabla
    const data = productos.map(producto => [
      producto.cve_producto,
      producto.nombre,
      producto.precio,
    ]);

    // Configurar el encabezado de la tabla
    const headers = ['ID', 'Nombre', 'Precio'];

    // Generar la tabla
    autoTable(
      
      doc,{
      startY: 30,
      theme: 'grid',
      head: [headers],
      body: data,
      styles: { fontSize: 12,},
      margin: { top: 20 },
      columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 50 }, 2: { cellWidth: 30 } }
    }
  );

    // Guardar o descargar PDF
    doc.save('productos.pdf');
  }


}