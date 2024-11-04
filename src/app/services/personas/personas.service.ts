import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Crud } from '../../interfaces/crud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private backUrl = "http://localhost:4000/productos"
  httpCliente = inject(HttpClient)

  getCrud(): Observable<Crud>{
    return this.httpCliente.get<Crud>(`${this.backUrl}`)
  }


  constructor() { }
}
