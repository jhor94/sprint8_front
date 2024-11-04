import { Component, inject, OnInit } from '@angular/core';
import { Crud } from '../../interfaces/crud';
import { RouterModule } from '@angular/router';
import { PersonasService } from '../../services/personas/personas.service';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.scss'
})
export class PersonasComponent  implements OnInit{
  personaServicio = inject(PersonasService)
  listaCrud: Crud[] = [{
    id: 1,
    nombre: 'Jhorman',
    apellido:'Cadena',
    email:'jhor@gmail.com',
    telefono:'1234567',
    localizacion:'Barcelona',
    hobby:'Bailar',
  }]
  
  ngOnInit(): void {
    
  }
  
  
  getListaCrud(){
    this.personaServicio.getCrud().subscribe((data: any) => {
      this.listaCrud = data
      console.log(this.listaCrud)
  })
  }
}
