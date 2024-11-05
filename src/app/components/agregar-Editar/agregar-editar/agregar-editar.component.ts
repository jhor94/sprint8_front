import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Crud } from '../../../interfaces/crud';
import { PersonasService } from '../../../services/personas/personas.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarComponent } from "../../../shared/progress-bar/progress-bar.component";

@Component({
  selector: 'app-agregar-editar',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ProgressBarComponent],
  templateUrl: './agregar-editar.component.html',
  styleUrl: './agregar-editar.component.scss'
})
export class AgregarEditarComponent implements OnInit {

  formAgregar: FormGroup
  loading: boolean = false
  id: number;
  Operacion: string = 'Agregar'

  constructor(private formBuilder: FormBuilder, private personaServicio: PersonasService, private toastr: ToastrService, private router: Router, private aRoute: ActivatedRoute) {
    this.formAgregar = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      localizacion: ['', Validators.required],
      hobby: ['', Validators.required],
    })
    this.id = Number(aRoute.snapshot.paramMap.get('id'))
    console.log(this.id)
  }

  ngOnInit(): void {
    if (this.id != 0) {
      //editar
      this.Operacion = 'Editar '
      this.MostrareditarPersona(this.id)
      
    }
  }

  MostrareditarPersona(id: number) { // funcion para editar producto
    this.loading = true;
    this.personaServicio.getPersona(id).subscribe((data: Crud) => {
      this.loading = false;
      this.formAgregar.setValue({
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        telefono: data.telefono,
        localizacion: data.localizacion,
        hobby: data.hobby,
      })
    })
  }

  agregarPersona() {
    this.loading = true;
    const persona: Crud = {
      nombre: this.formAgregar.get('nombre')?.value,
      apellido: this.formAgregar.get('apellido')?.value,
      email: this.formAgregar.get('email')?.value,
      telefono: this.formAgregar.get('telefono')?.value,
      localizacion: this.formAgregar.get('localizacion')?.value,
      hobby: this.formAgregar.get('hobby')?.value,
    }

    this.loading = true
     if(this.id !== 0){
      this.personaServicio.updateCrud(this.id,persona).subscribe(()=>{
        this.loading = false;
        this.toastr.info(`El usuario ${persona.nombre} fué actualizado con éxito`, `Usuario Editado`)
        this.router.navigate(['/personas'])

      })
     }else{
      this.loading= true
      this.personaServicio.saveCrud(persona).subscribe(() => {
        this.loading = false;
        this.toastr.success(` ${persona.nombre} fué agregado con éxito`, `Usuario registrado`)
        this.router.navigate(['/personas'])
      })
     }
   
  }


}
