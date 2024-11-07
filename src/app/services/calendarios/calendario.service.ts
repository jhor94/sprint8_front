import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
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
    this.ApiUrl = 'api/eventos/';
  }
  getEventos():Observable <Eventos[]>{
    return this.http.get<Eventos[]>(`${this.backUrl}${this.ApiUrl}`)
  }

  deleteEvento(id:number):Observable<void>{
    return this.http.delete<void>(`${this.backUrl}${this.ApiUrl}${id}`)
  }

  guardarEvento(evento: Eventos): Observable<Eventos>{
    return this.http.post<Eventos>(`${this.backUrl}${this.ApiUrl}`, evento)
  }

  getEvento(id:number):Observable<Eventos[]>{
    return this.http.get<Eventos[]>(`${this.backUrl}${this.ApiUrl}${id}`)
  }

  updateEvento(id:number,evento:Eventos): Observable<void>{
    return this.http.put<void>(`${this.backUrl}${this.ApiUrl}${id}`, evento)
  }
}
