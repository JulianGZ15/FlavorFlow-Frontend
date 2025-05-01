import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ventasC } from '../models/ventasC';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasCService {

  private url: string = 'http://localhost:8080/api/venta_create';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Obtén el token del sessionStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


  createVenta( idMesa: String ,ventasC: ventasC): Observable<any>{
    return this.http.post(this.url + '/' + idMesa, ventasC, { headers: this.getHeaders() })
  }


  getVentaPorMesa(idMesa: String): Observable<ventasC>{
    return this.http.get<ventasC>(this.url + '/buscar/' + idMesa,  { headers: this.getHeaders() } );
   }


   

  actualizarVenta(id: number, ventasC: ventasC ): Observable<any>{
    return this.http.put(this.url + '/' + id , ventasC, { headers: this.getHeaders() });
  }
   
}
