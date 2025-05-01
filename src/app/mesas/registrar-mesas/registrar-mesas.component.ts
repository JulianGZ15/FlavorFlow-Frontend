import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MesasService } from '../../services/mesas.service';
import { Mesas } from '../../models/mesas';
import { Zona } from '../../models/zonas';
import { ZonasService } from '../../services/zonas.service';

@Component({
  selector: 'app-registrar-mesas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    CommonModule,
    ToastrModule,
  ],
  templateUrl: './registrar-mesas.component.html',
  styleUrl: './registrar-mesas.component.css'
})
export class RegistrarMesasComponent implements OnInit {

  
  mesaForm: FormGroup;
  titulo = 'Crear Mesa';
  id: string | null;
  id_zona: string | null;
  zonas: Zona[] = [];
  selectedZona: Zona | null = null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private mesaService: MesasService,
              private zonaService: ZonasService,
              private activatedRoute: ActivatedRoute) {
    this.mesaForm = this.fb.group({
      asientos: ['', Validators.required],
      num_mesa: ['', Validators.required],
      zona: ['', Validators.required]
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.id_zona = this.activatedRoute.snapshot.paramMap.get('id_zona');
  }

  ngOnInit(): void {
    this.getZonas();
    this.esEditar();
  }

  getZonas() {
    this.zonaService.getZonas().subscribe(zonas => {
      this.zonas = zonas;
    });
  }

  agregarMesa() {
    const mesa: Mesas = {
      cve_mesa: 0,
      cve_restaurante: 0,
      num_mesa: this.mesaForm.get('num_mesa')?.value,
      asientos: this.mesaForm.get('asientos')?.value,
      zona: this.mesaForm.get('zona')?.value
    };

    if (this.id !== null && this.id_zona !== null) {
      // Editar mesa
      this.mesaService.editMesa(this.id,this.id_zona, mesa ).subscribe(data => {
        this.toastr.success('La mesa fue editada con éxito', 'Mesa Editada');
        this.router.navigate(['/dashboard/mesas/listamesas']);
      });
    } else {
      // Crear mesa
      this.mesaService.createMesa(mesa, mesa.zona.cve_zona).subscribe(data => {
        this.toastr.success('La mesa fue registrada con éxito', 'Mesa Registrada');
        this.router.navigate(['/dashboard/mesas/listamesas']);
      });
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Mesa';
      this.mesaService.obtenerMesa(this.id).subscribe(data => {
        this.mesaForm.setValue({
          asientos: data.asientos,
          num_mesa: data.num_mesa,
          zona: data.zona
        });
      });
    }
  }



}
