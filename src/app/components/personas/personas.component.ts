import { Component, inject, OnInit } from '@angular/core';
import { Crud } from '../../interfaces/crud';
import { RouterModule } from '@angular/router';
import { PersonasService } from '../../services/personas/personas.service';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [RouterModule, ProgressBarComponent],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.scss'
})
export class PersonasComponent implements OnInit {
  personaServicio = inject(PersonasService)
  listaCrud: Crud[] = []
  loading: Boolean = false

  ngOnInit(): void {
    this.getListaCrud()
  }

  getListaCrud() {
    this.loading = true

    this.personaServicio.getCrud().subscribe((data: Crud[]) => {
      this.listaCrud = data
      console.log(this.listaCrud)
      this.loading = false;
    })
  }

  borrarPersona(id: number) {
    console.log(id);
    this.personaServicio.deleteCrud(id).subscribe(()=> {
      this.getListaCrud()
    })
  }

}
