import { Component, inject, OnInit } from '@angular/core';
import { LocalizacionService } from '../../../services/localizaciones/localizacion.service';
import { Localizaciones } from '../../../interfaces/localizaciones';

@Component({
  selector: 'app-mapas',
  standalone: true,
  imports: [],
  templateUrl: './mapas.component.html',
  styleUrl: './mapas.component.scss'
})
export class MapasComponent implements OnInit {

  localizacionServicio = inject(LocalizacionService)
  listaLocalizaciones: Localizaciones[] = []

  ngOnInit(): void {
    this.getListaLocalizaciones()
  }

  getListaLocalizaciones()
{
  this.localizacionServicio.getLocalizaciones().subscribe((data: Localizaciones[])=>{
    this.listaLocalizaciones = data
    console.log(this.listaLocalizaciones)
  })
}


}
