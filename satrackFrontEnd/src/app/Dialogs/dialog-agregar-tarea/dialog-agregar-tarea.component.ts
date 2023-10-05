import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

import { TareaService } from 'src/app/Services/tarea.service';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { Categoria } from 'src/app/Interfaces/categoria';
import { Tarea } from 'src/app/Interfaces/tarea';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  }, display: {
    dateInput: 'DD/MM/YYYY'
  }

}

@Component({
  selector: 'app-dialog-agregar-tarea',
  templateUrl: './dialog-agregar-tarea.component.html',
  styleUrls: ['./dialog-agregar-tarea.component.css'],
  providers: [
    {
      provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS
    }
  ]
})
export class DialogAgregarTareaComponent implements OnInit {

  formTarea: FormGroup;
  botonAccion: string = "Guardar";
  listaCategorias: Categoria[] = []

  constructor(
    private dialogoReferencia: MatDialogRef<DialogAgregarTareaComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _tareaService: TareaService,
    private _categoriaService: CategoriaService,
    @Inject(MAT_DIALOG_DATA) public dataTarea:Tarea
  ) {

    this.formTarea = this.fb.group({
      Titulo: ['', Validators.required],
      Descripcion: ['', Validators.required],
      FechaFinalizacion: ['', Validators.required],
      CategoriaTarea: ['', Validators.required]
    })

    this._categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.listaCategorias = data;
      }, error: (e) => { }

    })

  }
  ngOnInit(): void { 
    if(this.dataTarea){
      this.formTarea.patchValue({
        Titulo: this.dataTarea.TituloTarea,
        Descripcion: this.dataTarea.DescripcionTarea,
        FechaFinalizacion: moment(this.dataTarea.FechaFinalizacion,'DD/MM/YY'),
        CategoriaTarea:this.dataTarea.IdCategoria
      })
    }

  }

  MostrarAlerta(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 3000
    });
  }

  AgregarTarea() {

    const modelo: Tarea = {
      IdTarea: 0,
      TituloTarea: this.formTarea.value.Titulo,
      DescripcionTarea: this.formTarea.value.Descripcion,
      FechaFinalizacion: this.formTarea.value.FechaFinalizacion,
      IdCategoria: this.formTarea.value.CategoriaTarea
    }
    this._tareaService.addTarea(modelo).subscribe(
      result => {                
        this.MostrarAlerta("Agregado correctamente", "Listo");
        this.dialogoReferencia.close("creado");
      },
      error => {
        this.MostrarAlerta(error, "Error");
      }
    );
  }

}

