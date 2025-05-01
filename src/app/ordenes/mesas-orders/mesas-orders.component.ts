import { Component, OnInit } from '@angular/core';
import { Mesas } from '../../models/mesas';
import { MesasService } from '../../services/mesas.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { VentasCService } from '../../services/ventas-c.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mesas-orders',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './mesas-orders.component.html',
  styleUrl: './mesas-orders.component.css'
})
export class MesasOrdersComponent implements OnInit {
  mesas: Mesas[] = [];
  estatusMesas: { [id: number]: string } = {}; // Objeto para almacenar el estado de cada mesa por su ID

  constructor(private service: MesasService, 
              private toastr: ToastrService,
              private router: Router,
              private ventasCService: VentasCService) {}

  ngOnInit(): void {
    this.getMesas();
  }

  getMesas(): void {
    this.service.getMesas().subscribe(data => {
      this.mesas = data;

      this.mesas.forEach(mesa => {
        this.obtenerEstatus(mesa.cve_mesa);
      });

    });
  }

  Atender(id: number) {
    this.router.navigateByUrl('/orders/productos/' + id);
  }

  obtenerEstatus(idMesa: number): void {
    this.ventasCService.getVentaPorMesa(idMesa.toString()).subscribe(
      data => {
        console.log(data.cve_venta);
        if (data.cve_venta !== 0) {
          this.estatusMesas[idMesa] = 'Mesa ocupada'; // Almacenar el estado por ID de mesa
        } else {
          this.estatusMesas[idMesa] = 'Mesa libre';
        }
      }
    );
  }

    
}
