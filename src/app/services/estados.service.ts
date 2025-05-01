import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estados } from '../models/estados';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

 

  private url: string = 'http://localhost:8080/api/estados/pais';

  constructor(private http: HttpClient) { }



  getEstados(cve_pais: number): Observable<Estados[]>{
   return this.http.get<Estados[]>(this.url + '/' + cve_pais );
  }
}
