import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { MapasComponent } from './components/eventos/mapas/mapas.component';
import { GraficosComponent } from './components/eventos/graficos/graficos.component';
import { CalendarioComponent } from './components/eventos/calendario/calendario.component';
import { PersonasComponent } from './components/personas/personas.component';
import { AgregarEditarComponent } from './components/agregar-Editar/agregar-editar/agregar-editar.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'personas', component: PersonasComponent},
    {path: 'agregar', component: AgregarEditarComponent},
    {path: 'editar/:id', component: AgregarEditarComponent},
    {path: 'mapa', component: MapasComponent},
    {path: 'grafico', component: GraficosComponent},
    {path: 'calendario', component: CalendarioComponent},

    {path:'***', redirectTo: '', pathMatch:'full'}
];
