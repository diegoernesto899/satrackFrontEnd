import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import { Categoria } from '../Interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + 'Categoria/ObtenerCategorias';
  constructor(private http:HttpClient) { }

  getCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.apiUrl}`);
  }

}
