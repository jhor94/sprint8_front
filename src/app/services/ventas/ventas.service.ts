import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../../interfaces/ventas';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private backUrl: string;
  private ApiUrl: string;


  constructor(private http: HttpClient) { 
    this.backUrl = environment.endpoint
    this.ApiUrl = 'api/ventas/'
  }

  getVentas(): Observable <Venta[]>{
    return this.http.get<Venta[]>(this.backUrl + this.ApiUrl);
  }

  getVenta(id:number):Observable<Venta>{
    return this.http.get<Venta>(`${this.backUrl}${this.ApiUrl}${id}`);
  }

  deleteVenta(id:number):Observable<void>{
    return this.http.delete<void>(`${this.backUrl}${this.ApiUrl}${id}`);
  }

  saveVenta(venta:Venta):Observable<void>{
    return this.http.post<void>(this.backUrl + this.ApiUrl, venta);
  }

  updateVenta(id:number, venta: Venta):Observable<void>{
    return this.http.put<void>(`${this.backUrl}${this.ApiUrl}${id}`, venta);
  }
}
