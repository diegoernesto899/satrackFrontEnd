import { Categoria } from "./categoria";

export interface Tarea {
    IdTarea:number,
    TituloTarea:string,
    DescripcionTarea?:string,
    FechaFinalizacion:Date,
    CategoriaTarea?:Categoria,
    IdCategoria:number
}


