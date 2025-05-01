import { Injectable } from '@angular/core';
import { Productos } from '../models/productos';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MVendidos } from '../models/masvendidos';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    private url: string = 'http://localhost:8080/api/productos';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('token'); // Obtén el token del sessionStorage
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }

    getProductos(): Observable<Productos[]>{
     return this.http.get<Productos[]>(this.url,  { headers: this.getHeaders() } );
    }


    deleteProducto(id: number): Observable<any>{
      return this.http.delete(this.url +'/'+ id, { headers: this.getHeaders() });
    }

    createProducto(producto: Productos): Observable<any>{
      return this.http.post(this.url, producto, { headers: this.getHeaders() })
    }

    obtenerProducto(id: string): Observable<any>{
      return this.http.get(this.url + '/' + id, { headers: this.getHeaders() })
    }

    editProducto(id: string, producto: Productos ): Observable<any>{
      return this.http.put(this.url + '/' + id, producto, { headers: this.getHeaders() });
    }

    getMasVendidos(): Observable<MVendidos[]>{
      return this.http.get<MVendidos[]>(this.url + '/mas_vendidos',  { headers: this.getHeaders() } );
     }
}
