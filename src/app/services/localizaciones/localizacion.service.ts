import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Localizaciones } from '../../interfaces/localizaciones';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  private backUrl: string;
  private apiUrl: string;


  constructor(private hhtp: HttpClient) {
    this.backUrl = environment.endpoint
    this.apiUrl = 'api/localizaciones/'
   }

   getLocalizaciones(): Observable <Localizaciones[]>{
    return this.hhtp.get<Localizaciones[]>(`${this.backUrl}${this.apiUrl}`)
   }
}
