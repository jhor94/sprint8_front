import { Component, inject, OnInit } from '@angular/core';
import { Crud } from '../../interfaces/crud';
import { RouterModule } from '@angular/router';
import { PersonasService } from '../../services/personas/personas.service';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastr: ToastrService) { }

  getListaCrud() {
    this.loading = true

    this.personaServicio.getCrud().subscribe((data: Crud[]) => {
      this.listaCrud = data
      this.loading = false;
    })
  }

  borrarPersona(id: number) {
    if (confirm(`Estas seguro que quieres borrar este usuario?`)) {
      this.loading = true;
      this.personaServicio.deleteCrud(id).subscribe(() => {
        this.getListaCrud();
        this.toastr.warning('La persona fué eliminado con exito', 'Persona eliminada')
      })
    } else {
      this.toastr.info('La persona no fue eliminada', 'Persona no eliminada')
    }

  }
}
