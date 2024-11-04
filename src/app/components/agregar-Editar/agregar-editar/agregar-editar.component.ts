import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Crud } from '../../../interfaces/crud';

@Component({
  selector: 'app-agregar-editar',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './agregar-editar.component.html',
  styleUrl: './agregar-editar.component.scss'
})
export class AgregarEditarComponent {

  formAgregar:FormGroup


  constructor(private formBuilder: FormBuilder){
    this.formAgregar = this.formBuilder.group({
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      telefono:['', Validators.required],
      localizacion:['', Validators.required],
      hobby:['', Validators.required],
  })
}

  agregarPersona(){


    if(this.formAgregar.valid){
      console.log("entra el form")
      const persona: Crud = {
        nombre: this.formAgregar.get('nombre')?.value,
        apellido: this.formAgregar.get('apellido')?.value,
        email: this.formAgregar.get('email')?.value,
        telefono: this.formAgregar.get('telefono')?.value,
        localizacion: this.formAgregar.get('localizacion')?.value,
        hobby: this.formAgregar.get('hobby')?.value,
      }
      console.log(persona)
    }else{
      console.log("formularo invalido")
    }
  }


}
