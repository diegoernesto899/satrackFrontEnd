import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MomentDateModule} from '@angular/material-moment-adapter';

//mensajes de alertas
import{MatSnackBarModule} from '@angular/material/snack-bar'

//icons material
import {MatIconModule} from '@angular/material/icon';

//modales de material
import {MatDialogModule} from '@angular/material/dialog';

//Reactive Forms
import {ReactiveFormsModule} from '@angular/forms';

//Peticiones HTTP
import { HttpClientModule } from '@angular/common/http';

//grillas columnas y filas
import {MatGridListModule} from '@angular/material/grid-list';
import { DialogAgregarTareaComponent } from './Dialogs/dialog-agregar-tarea/dialog-agregar-tarea.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogAgregarTareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
