import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import { Tarea }  from '../Interfaces/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + 'Tarea/';
  constructor(private http:HttpClient) { }
  
  
  getTareas():Observable<Tarea[]>{
    return this.http.get<Tarea[]>(`${this.apiUrl}ObtenerTareas`);
  }
  
  addTarea(modelo:Tarea):Observable<Tarea>{
    return this.http.post<Tarea>(`${this.apiUrl}AgregarTarea`,modelo);
  }
  updateTarea(modelo:Tarea):Observable<Tarea>{
    return this.http.put<Tarea>(`${this.apiUrl}ActualizarTarea`,modelo);
  }

  deleteTarea(idTarea:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}EliminarTarea/${idTarea}`);
  }

}



