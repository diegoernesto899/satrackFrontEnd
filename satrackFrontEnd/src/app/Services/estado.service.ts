import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import { Estado } from '../Interfaces/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + 'Tarea/ObtenerEstados';
  constructor(private http:HttpClient) { }

  getEstados():Observable<Estado[]>{
    return this.http.get<Estado[]>(`${this.apiUrl}`);
  }

}
