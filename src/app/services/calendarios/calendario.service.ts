import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Eventos } from '../../interfaces/eventos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  private backUrl: string;
  private ApiUrl:string;


  constructor(private http: HttpClient) { 
    this.backUrl = environment.endpoint;
    this.ApiUrl = '/api/eventos/';
  }
  getEventos():Observable <Eventos[]>{
    return this.http.get<Eventos[]>(`${this.backUrl}${this.ApiUrl}`)
  }
}
