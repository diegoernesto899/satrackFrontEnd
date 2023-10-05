import { Categoria } from "./categoria";

export interface Tarea {
    idTarea:number,
    tituloTarea:string,
    descripcionTarea?:string,
    fechaFinalizacion:Date,
    categoriaTarea?:Categoria,
    idCategoria:number,
    idEstado:number    
}


