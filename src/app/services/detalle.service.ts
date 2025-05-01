import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detalle } from '../models/detalle';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {



  private url: string = 'http://localhost:8080/api/detalle_comanda';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Obtén el token del sessionStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getDetalles(): Observable<Detalle[]>{
   return this.http.get<Detalle[]>(this.url,  { headers: this.getHeaders() } );
  }


  deleteDetalle(id: number): Observable<any>{
    return this.http.delete(this.url +'/'+ id, { headers: this.getHeaders() });
  }

  createDetalle(idComanda: string, Detalle: Detalle): Observable<any>{
    return this.http.post(this.url +'/'+ idComanda, Detalle, { headers: this.getHeaders() })
  }

  obtenerDetalle(id: string): Observable<any>{
    return this.http.get(this.url + '/' + id, { headers: this.getHeaders() })
  }

  editDetalle(id: string, Detalle: Detalle ): Observable<any>{
    return this.http.put(this.url + '/' + id, Detalle, { headers: this.getHeaders() });
  }}
