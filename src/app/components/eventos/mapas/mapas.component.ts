import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { LocalizacionService } from '../../../services/localizaciones/localizacion.service';
import { Localizaciones } from '../../../interfaces/localizaciones';
import * as L from 'leaflet'

@Component({
  selector: 'app-mapas',
  standalone: true,
  imports: [],
  templateUrl: './mapas.component.html',
  styleUrl: './mapas.component.scss'
})
export class MapasComponent implements OnInit, AfterViewInit {

  localizacionServicio = inject(LocalizacionService)
  listaLocalizaciones: Localizaciones[] = []
  map: any

  ngOnInit(): void {
    this.getListaLocalizaciones()

  }

  ngAfterViewInit(): void {
    this.configMap()
  }

  configMap() {
    this.map = L.map('map').setView([41.38879000, 2.15899000], 13),


      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      }).addTo(this.map);

    const icon = L.icon({
      iconUrl: 'assets/placeholder.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    this.map.whenReady(() => {
      this.map.invalidateSize();
    });
  }

  getListaLocalizaciones() {
    this.localizacionServicio.getLocalizaciones().subscribe((data: Localizaciones[]) => {
      this.listaLocalizaciones = data
      console.log(this.listaLocalizaciones)


      this.listaLocalizaciones.forEach(localizacion => {
        const marker = L.marker(
          [localizacion.latitud, localizacion.longitud],
          {
            icon: L.icon({
              iconUrl: 'assets/placeholder.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32]
            })
          }
        ).addTo(this.map)
        marker.bindPopup(
          `<b><h3>${localizacion.nombre}</h3></b>
          <b><p>${localizacion.descripcion}</p></b>`)
      })
    })
  }


  centrarMapa(localizacion: Localizaciones){
    this.map.setView([localizacion.latitud,localizacion.longitud],14)

  }
}

