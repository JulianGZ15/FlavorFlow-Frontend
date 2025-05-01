import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paises } from '../models/paises';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {


  private url: string = 'http://localhost:8080/api/paises';

  constructor(private http: HttpClient) { }



  getPaises(): Observable<Paises[]>{
   return this.http.get<Paises[]>(this.url );
  }
}
