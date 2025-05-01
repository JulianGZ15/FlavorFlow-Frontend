import { Component, OnInit } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CrearPuestosComponent } from '../crear-puestos/crear-puestos.component';
import { Puesto } from '../../models/puestos';
import { PuestosService } from '../../services/puestos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-puestos',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenav,
    MatSidenavModule,
    CrearPuestosComponent
  ],
  templateUrl: './listar-puestos.component.html',
  styleUrl: './listar-puestos.component.css'
})
export class ListarPuestosComponent implements OnInit {

  puestos: Puesto[] = [];

  constructor(private service: PuestosService
    , private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getPuestos();
  }

  getPuestos(): void {
    this.service.getPuestos().subscribe(data => {
      this.puestos = data;
    });
  }

  addPuesto(Puesto: Puesto): void {
    this.puestos.push(Puesto);
  }

  deletePuesto(cve_puesto: number): void {
    this.service.deletePuesto(cve_puesto).subscribe(data => {
      this.toastr.error('El puesto fue eliminado con éxito', 'Puesto eliminado');
      this.getPuestos(); // Actualizar la lista de productos después de eliminar uno
    });
  }
}
