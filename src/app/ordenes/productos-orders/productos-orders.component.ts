import { Component, OnInit } from '@angular/core';
import { Productos } from '../../models/productos';
import { ProductoService } from '../../services/productos.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Comanda } from '../../models/comanda';
import { Venta } from '../../models/ventas';
import { Detalle } from '../../models/detalle';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, getLocaleDateFormat } from '@angular/common';
import { ComandaService } from '../../services/comanda.service';
import { MesasService } from '../../services/mesas.service';
import { VentasService } from '../../services/ventas.service';
import { comandaCService } from '../../services/comanda-c.service';
import { VentasCService } from '../../services/ventas-c.service';
import { comandaC } from '../../models/comandaC';
import { ventasC } from '../../models/ventasC';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleService } from '../../services/detalle.service';
import { forkJoin, switchMap, tap } from 'rxjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-productos-orders',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    

  ],
  templateUrl: './productos-orders.component.html',
  styleUrl: './productos-orders.component.css'
})
export class ProductosOrdersComponent implements OnInit {

  detalleForm: FormGroup;



  productos: Productos[] = [];

  idMesa !: string | null;

  detalles: Detalle[] = [];

  productosVenta!:Comanda[];

  comandaImp !: Comanda;

  ventaImp !: Comanda[];


  constructor(private fb: FormBuilder,
    private service: ProductoService,
    private comandaCreateService: comandaCService,
    private comandaService: ComandaService,
    private ventasCreateService: VentasCService,
    private detalleService: DetalleService,
    private ventaService: VentasService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private router: Router) {

    this.detalleForm = this.fb.group({
      cantidad: ['', Validators.required],
      producto: ['', Validators.required],
      nota:['']

    })

    this.idMesa = this.aRouter.snapshot.paramMap.get('id');

  }




  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.service.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  aumentarCantidad() {
    let cantidad = this.detalleForm.get('cantidad')?.value;
    this.detalleForm.patchValue({ cantidad: cantidad + 1 });
  }

  disminuirCantidad() {
    let cantidad = this.detalleForm.get('cantidad')?.value;
    if (cantidad > 1) {
      this.detalleForm.patchValue({ cantidad: cantidad - 1 });
    }
  }



  comandaCreada !: string
  ventaCreada !: string
  ventaObtenida !: string


  agregarDetalle(producto: Productos) {

    const detalle: Detalle = {
      cantidad: this.detalleForm.get('cantidad')?.value,
      producto: producto,
      nota: this.detalleForm.get('nota')?.value,
    }

    this.detalles.push(detalle)

    this.detalleForm.setValue({
      nota: '',
      cantidad:'',
      producto:''
    })

    for (let i = 0; i < this.detalles.length; i++) {
      const detalle = this.detalles[i];
      console.log(detalle)
    }

    this.refreshForm();

  }



  crearComanda() {
    const ventaC: ventasC = {
      cve_venta: 0,
      estatus: 1
    };
  
    const comandaC: comandaC = {
      cve_comanda: 0,
    };
  
    if (this.idMesa !== null) {
      const idMesa = this.idMesa;
  
      this.ventasCreateService.getVentaPorMesa(idMesa).pipe(
        switchMap((ventaObtenidaData: any) => {
          const ventaObtenida = ventaObtenidaData.cve_venta;
          if (ventaObtenida !== 0) {
            return this.comandaCreateService.createcomandaC(ventaObtenida, comandaC).pipe(
              switchMap((comandaCreadaData: any) => {
                const detallesPromises = this.detalles.map(detalle =>
                  this.detalleService.createDetalle(comandaCreadaData.cve_comanda, detalle).toPromise()
                );
                return forkJoin(detallesPromises).pipe(
                  tap(() => this.imprimirComanda(comandaCreadaData.cve_comanda))
                );
              })
            );
          } else {
            return this.ventasCreateService.createVenta(idMesa, ventaC).pipe(
              switchMap((ventaCreadaData: any) => {
                this.ventaCreada = ventaCreadaData.cve_venta;
                return this.comandaCreateService.createcomandaC(this.ventaCreada, comandaC).pipe(
                  switchMap((comandaCreadaData: any) => {
                    const detallesPromises = this.detalles.map(detalle =>
                      this.detalleService.createDetalle(comandaCreadaData.cve_comanda, detalle).toPromise()
                    );
                    return forkJoin(detallesPromises).pipe(
                      tap(() => this.imprimirComanda(comandaCreadaData.cve_comanda))
                    );
                  })
                );
              })
            );
          }
        })
      ).subscribe(
        () => {
          this.toastr.success('Comanda generada con éxito!', 'Comanda Enviada');
          this.router.navigate(['/orders/empleados']);
          console.log("Ventas y comandas creadas correctamente");
        },
        error => {
          console.error("Error al crear ventas y comandas", error);
        }
      );
    }
  }
  



  actualizarVenta() {

    const VentaA: ventasC = {
      cve_venta: 0,
      estatus: 0

    }

    if (this.idMesa !== null) {
      this.ventasCreateService.getVentaPorMesa(this.idMesa).subscribe(
        data => {
          this.ventasCreateService.actualizarVenta(data.cve_venta, VentaA).subscribe(
            data => {
              this.ventaService.getVentasById(data.cve_venta).subscribe(
                data=>{ 
                this.imprimirTicket(data.cve_venta);

                }
              )
               console.log("la venta con el id ", data.cve_venta, " ha sido finalizada")
            this.toastr.success('Venta Finalizada con éxito!', 'Venta Finalizada');
            this.router.navigate(['/orders/empleados']);
             }
          )
        }

      )

    }

  }


  detallesVenta(){
    if (this.idMesa !== null) {
      this.ventasCreateService.getVentaPorMesa(this.idMesa).subscribe(
        data => { if(data.cve_venta !== 0){
          this.ventaService.getVentasById(data.cve_venta).subscribe(
            data=>{
              this.productosVenta=data.comandas
            }
          )
        }
         
        }

      )

    }
  }



  refreshForm() {
    // Actualizar la variable de control para forzar la actualización del ciclo *ngFor
    this.detalles = [...this.detalles];
  }


  eliminarDetalleComanda(detalle: Detalle) {
    // Encontrar el índice del detalle en la lista de detalles de la comanda
    const index = this.detalles.indexOf(detalle);
    if (index !== -1) {
      // Eliminar el detalle de la lista de detalles de la comanda
      this.detalles.splice(index, 1);
    }
  }



  imprimirComanda(idComanda: number) {
    this.comandaService.getComandaById(idComanda).subscribe(
      data => {
        console.log(data);
        this.comandaImp = data;
  
        const doc = new jsPDF();

        console.log(this.comandaImp.items)
  
        // Encabezado
        doc.setFontSize(18);
        doc.text('Comanda', 105, 20, { align: 'center' });


  
        // Configurar los datos de la tabla
        const tableData =  this.comandaImp.items.map(comanda => [
          comanda.producto.nombre,
          comanda.cantidad,
          comanda.nota ? comanda.nota.toString() : ''
        ]);
  
        // Configurar el encabezado de la tabla
        const headers = ['Producto', 'Cantidad', 'Nota'];
  
        // Generar la tabla
        autoTable(
          doc,
          {
            startY: 30,
            theme: 'grid',
            head: [headers],
            body: tableData,
            styles: { fontSize: 12 },
            margin: { top: 20 },
            columnStyles: { 0: { cellWidth: 25 }, 1: { cellWidth: 30 }, 2: { cellWidth: 50 } }
          }
        );
  
        // Guardar o descargar PDF
        doc.autoPrint();
        doc.output('dataurlnewwindow',{filename:'comanda.pdf'})
        
      },
      error => {
        console.error('Error al obtener la comanda:', error);
      }
    );
  }
  







  imprimirTicket(idVenta: number) {
    const doc = new jsPDF();
  
    // Configurar el ticket
    const ticketWidth = 80;
    const lineHeight = 8;
    const marginTop = 10;
    const marginLeft = 10;
  
    this.ventaService.getVentasById(idVenta).subscribe(
      data => {
        console.log(data);
        const fecha=data.fecha
        this.ventaImp = data.comandas;
  
        // Encabezado
        doc.setFontSize(18);
        doc.text('Nota de venta', 105, 20, { align: 'center' });
        doc.text(`Fecha: ${fecha}`, marginLeft, 30);
  
        // Configurar los datos de la tabla
        const tableData = this.ventaImp.flatMap(comanda =>
          comanda.items.map(item => [
            item.producto.nombre,
            item.cantidad,
            item.producto.precio || '', // Asegúrate de manejar el caso en que el precio pueda ser nulo
            (item.cantidad * item.producto.precio).toFixed(2)
          ])
        );
  
        // Configurar el encabezado de la tabla
        const headers = ['Producto', 'Cantidad', 'Precio Unitario', 'Total de la orden'];
  
        // Generar la tabla
        autoTable(
          doc,
          {
            startY: 40,
            theme: 'plain',
            head: [headers],
            body: tableData,
            styles: { fontSize: 12 },
            margin: { top: 40 },
            columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 20 }, 2: { cellWidth: 25 }, 3: { cellWidth: 30 } }
          }
        );
  
        // Calcular el importe total, el IVA y el gran total
        const importeTotal = data.importe
  
        const iva = data.iva;
        const granTotal = data.total;
  
        // Mostrar el importe, el IVA y el gran total
        doc.text(`Importe: $${importeTotal}`, marginLeft, doc.internal.pageSize.height - 35);
        doc.text(`IVA: $${iva}`, marginLeft, doc.internal.pageSize.height - 25);
        doc.text(`Gran Total: $${granTotal}`, marginLeft, doc.internal.pageSize.height - 15);
  
        // Guardar o descargar PDF
        doc.autoPrint();
        doc.output('dataurlnewwindow', { filename: 'comanda.pdf' })
  
      },
      error => {
        console.error('Error al obtener la comanda:', error);
      }
    );
  }
  

}
