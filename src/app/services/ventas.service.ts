import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/ventas';
import { gananciasM } from '../models/gananciasMes';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private url: string = 'http://localhost:8080/api/venta';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Obtén el token del sessionStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getVentas(): Observable<Venta[]>{
   return this.http.get<Venta[]>(this.url,  { headers: this.getHeaders() } );
  }

  getVentasById(idVenta: number): Observable<Venta>{
    return this.http.get<Venta>(this.url+'/'+ idVenta,  { headers: this.getHeaders() } );
   }

  deleteVenta(id: number): Observable<any>{
    return this.http.delete(this.url +'/'+ id, { headers: this.getHeaders() });
  }

  createVenta(Venta: Venta): Observable<any>{
    return this.http.post(this.url, Venta, { headers: this.getHeaders() })
  }

  obtenerVenta(id: string): Observable<any>{
    return this.http.get(this.url + '/' + id, { headers: this.getHeaders() })
  }

  editVenta(id: string, Venta: Venta ): Observable<any>{
    return this.http.put(this.url + '/' + id, Venta, { headers: this.getHeaders() });
  }

  getGanaciaMes(): Observable<gananciasM[]>{
    return this.http.get<gananciasM[]>(this.url+ '/ganancias_mes',  { headers: this.getHeaders() } );
   }
}
