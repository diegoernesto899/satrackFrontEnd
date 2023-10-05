import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TareaService } from './Services/tarea.service';
import {Tarea} from './Interfaces/tarea';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogAgregarTareaComponent } from './Dialogs/dialog-agregar-tarea/dialog-agregar-tarea.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit {
  title = 'satrackFrontEnd';
  displayedColumns: string[] = ['IdTarea', 'TituloTarea', 'FechaFinalizacion', 'CategoriaTarea','EditarTarea','EliminarTarea'];
  dataSource = new MatTableDataSource<Tarea>();

  constructor(private _tareaService:TareaService,public dialog:MatDialog){
  }

  openDialogAgregarTarea() {
    this.dialog.open(DialogAgregarTareaComponent);
  }

  ngOnInit(): void {
    this.ListarTareas();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ListarTareas(){
    this._tareaService.getTareas().subscribe({
      next:(data)=> {
        console.log(data);
        this.dataSource.data = data;
      },error:(e)=>{}
    });
  }

}


