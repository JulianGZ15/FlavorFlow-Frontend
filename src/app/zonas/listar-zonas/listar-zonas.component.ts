import { Component, OnInit } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CrearZonasComponent } from '../crear-zonas/crear-zonas.component';
import { Zona } from '../../models/zonas';
import { ZonasService } from '../../services/zonas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-zonas',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenav,
    MatSidenavModule,
    CrearZonasComponent
  ],
  templateUrl: './listar-zonas.component.html',
  styleUrl: './listar-zonas.component.css'
})
export class ListarZonasComponent implements OnInit {
  zonas: Zona[] = [];

  constructor(private service: ZonasService
    , private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getZonas();
  }

  getZonas(): void {
    this.service.getZonas().subscribe(data => {
      this.zonas = data;
    });
  }

  deleteZona(cve_zona: number): void {
    this.service.deleteZona(cve_zona).subscribe(data => {
      this.toastr.error('La zona fue eliminada con éxito', 'Zona eliminada');
      this.getZonas(); // Actualizar la lista de productos después de eliminar uno
    });
  }

}
