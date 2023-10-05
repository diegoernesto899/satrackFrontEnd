import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TareaService } from './Services/tarea.service';
import { Tarea } from './Interfaces/tarea';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogAgregarTareaComponent } from './Dialogs/dialog-agregar-tarea/dialog-agregar-tarea.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'satrackFrontEnd';
  displayedColumns: string[] = ['IdTarea', 'TituloTarea', 'FechaFinalizacion', 'CategoriaTarea','Estado', 'EditarTarea', 'EliminarTarea'];
  dataSource = new MatTableDataSource<Tarea>();

  constructor(private _tareaService: TareaService, public dialog: MatDialog,private _snackBar: MatSnackBar,) {
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

  ListarTareas() {
    this._tareaService.getTareas().subscribe({
      next: (data) => {        
        this.dataSource.data = data;
      }, error: (e) => { }
    });
  }


  openDialogAgregarTarea() {
    this.dialog.open(DialogAgregarTareaComponent,{
      disableClose:true,
      width:"300px",
    }).afterClosed().subscribe(resultado=>{
      if (resultado==="creado"){
        this.ListarTareas();
      }
    });
  }
  

  openDialogEditarTarea(dataTarea:Tarea) {    
    console.log(dataTarea);
    this.dialog.open(DialogAgregarTareaComponent,{
      width:"400px",
      data:dataTarea      
    }).afterClosed().subscribe(resultado=>{
      if (resultado==="actualizado"){
        this.ListarTareas();
      }
    });
  }

  eliminarTarea(idTarea:number){
    
    this._tareaService.deleteTarea(idTarea).subscribe(
      
      result => {                
        this.MostrarAlerta("Eliminado correctamente", "Eliminado");
        this.ListarTareas();
      },
      error => {
        this.MostrarAlerta(error, "Error");
      }
    );
  }
  
  MostrarAlerta(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 3000
    });
  }
}


