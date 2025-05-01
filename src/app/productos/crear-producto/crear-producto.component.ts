import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Productos } from '../../models/productos';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../services/productos.service';



@Component({
  selector: 'crear-producto',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    CommonModule,
    ToastrModule,

  ],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})


export class CrearProductoComponent implements OnInit{


  productoForm: FormGroup;

  titulo = 'crear producto'
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private service: ProductoService,
    private aRouter: ActivatedRoute) {

    this.productoForm = this.fb.group({

      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required],

    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto() {
    console.log(this.productoForm);

    const PRODUCTO: Productos = {
      cve_producto: this.productoForm.get('precio')?.value,
      cve_restaurante: this.productoForm.get('precio')?.value,
      nombre: this.productoForm.get('nombre')?.value,
      precio: this.productoForm.get('precio')?.value,
      imagen: this.productoForm.get('imagen')?.value
    }

    if(this.id !== null){
      //editar producto
      this.service.editProducto(this.id, PRODUCTO).subscribe(data=>{
        this.toastr.success('El producto fue editado con exito!', 'Producto Editado!');
        this.router.navigate(['/dashboard/productos/listaproductos'])
      })
    }else{
      //creamos producto
      this.service.createProducto(PRODUCTO).subscribe(data => {
        this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado!');
        this.router.navigate(['/dashboard/productos/listaproductos'])
      })
  
      console.log(PRODUCTO);
  
    }


  }

  esEditar() {
    if (this.id !== null) {
      console.log(this.id)
      this.titulo = 'Editar Producto';
      this.service.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          nombre: data.nombre,
          precio: data.precio,
          imagen: data.imagen,

        })
      })
    }
  }




}
