import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Zona } from '../models/zonas';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  

  private url: string = 'http://localhost:8080/api/zonas';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Obtén el token del sessionStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getZonas(): Observable<Zona[]>{
   return this.http.get<Zona[]>(this.url,  { headers: this.getHeaders() } );
  }


  deleteZona(id: number): Observable<any>{
    return this.http.delete(this.url +'/'+ id, { headers: this.getHeaders() });
  }

  createZona(zona: Zona): Observable<any>{
    return this.http.post(this.url, zona, { headers: this.getHeaders() })
  }

  obtenerZona(id: string): Observable<any>{
    return this.http.get(this.url + '/' + id, { headers: this.getHeaders() })
  }

  editZona(id: string, zona: Zona ): Observable<any>{
    return this.http.put(this.url + '/' + id, zona, { headers: this.getHeaders() });
  }
}
