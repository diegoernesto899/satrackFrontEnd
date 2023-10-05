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
import { Estado } from 'src/app/Interfaces/estado';
import { EstadoService } from 'src/app/Services/estado.service';

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
  tituloAccion: string ="AGREGAR TAREA";
  botonAccion: string = "Guardar";
  listaCategorias: Categoria[] = [];
  listaEstados: Estado[] = [];

  constructor(
    private dialogoReferencia: MatDialogRef<DialogAgregarTareaComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _tareaService: TareaService,
    private _categoriaService: CategoriaService,
    private _estadoService: EstadoService,
    @Inject(MAT_DIALOG_DATA) public dataTarea:Tarea
  ) {    
    this.formTarea = this.fb.group({
      Titulo: ['', Validators.required],
      Descripcion: ['', Validators.required],
      FechaFinalizacion: ['', Validators.required],
      CategoriaTarea: ['', Validators.required],
      EstadoTarea: ['', Validators.required],
      IdTarea:[],
      idEstado:[]
    })

    this._categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.listaCategorias = data;
      }, error: (e) => { }

    })

    this._estadoService.getEstados().subscribe({
      next: (data) => {        
        this.listaEstados = data;        
      }, error: (e) => { }

    })

  }
  ngOnInit(): void { 
    if(this.dataTarea){  
        console.log(this.dataTarea)
      this.formTarea.patchValue({
        Titulo: this.dataTarea.tituloTarea,
        Descripcion: this.dataTarea.descripcionTarea,
        FechaFinalizacion: this.dataTarea.fechaFinalizacion,
        CategoriaTarea:this.dataTarea.idCategoria,
        IdTarea:this.dataTarea.idTarea,
        EstadoTarea:this.dataTarea.idEstado
      })
      this.tituloAccion = "EDITAR TAREA";
      this.botonAccion = "Actualizar";
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
console.log(this.formTarea.value);
    const modelo: Tarea = {
      idTarea: 0,   
      idEstado:0,   
      tituloTarea: this.formTarea.value.Titulo,
      descripcionTarea: this.formTarea.value.Descripcion,
      fechaFinalizacion: this.formTarea.value.FechaFinalizacion,
      idCategoria: this.formTarea.value.CategoriaTarea       
    }
    if(this.dataTarea == null){
    
    this._tareaService.addTarea(modelo).subscribe(
      result => {                
        this.MostrarAlerta("Agregado correctamente", "Listo");
        this.dialogoReferencia.close("creado");
      },
      error => {
        this.MostrarAlerta(error, "Error");
      }
    );
  }else{
    
    modelo.idTarea= this.formTarea.value.IdTarea;
    modelo.idEstado= this.formTarea.value.EstadoTarea;    
    this._tareaService.updateTarea(modelo).subscribe(
      result => {                
        this.MostrarAlerta("Actualizado correctamente", "Listo");
        this.dialogoReferencia.close("actualizado");
      },
      error => {
        this.MostrarAlerta(error, "Error");
      }
    );

  }
  }

}

