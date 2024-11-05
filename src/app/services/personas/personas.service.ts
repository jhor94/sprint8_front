import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Crud } from '../../interfaces/crud';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private backUrl: string;
  private apiUrl: string;
  

  constructor (private httpCliente: HttpClient) { 
    this.backUrl = environment.endpoint;
    this.apiUrl = 'api/personas/'
  }

  getCrud(): Observable<Crud[]>{
    return this.httpCliente.get<Crud[]>(`${this.backUrl}${this.apiUrl}`)
  }

  deleteCrud(id: number):Observable<void>{
    return this.httpCliente.delete<void>(`${this.backUrl}${this.apiUrl}${id}`)
  }

}
