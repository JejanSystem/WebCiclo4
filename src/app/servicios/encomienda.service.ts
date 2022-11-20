import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncomiendaModel } from '../modelos/encomienda.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EncomiendaService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 
      this.token = this.seguridadService.getToken();
    }
    //Crear un usuario
    store(usuario: EncomiendaModel): Observable<EncomiendaModel> {
      return this.http.post<EncomiendaModel>(`${this.url}/encomiendas`, {
        id: usuario.id,
        descripcion: usuario.descripcion,
        peso: usuario.peso,
        tipo: usuario.tipo,
        presentacio: usuario.presentacion,
      });
    }
    //Obtiene todos los usuarios
    getAll(): Observable<EncomiendaModel[]>{
      return this.http.get<EncomiendaModel[]>(`${this.url}/usuarios`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    //Actualiza un usuario
    update(usuario: EncomiendaModel): Observable<EncomiendaModel> {
      return this.http.patch<EncomiendaModel>(`${this.url}/usuarios/${usuario.id}`, {
        id: usuario.id,
        descripcion: usuario.descripcion,
        peso: usuario.peso,
        tipo: usuario.tipo,
        presentacion: usuario.presentacion
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }
    //Elimina un usuario
    delete(id: string): Observable<EncomiendaModel[]>{
      return this.http.delete<EncomiendaModel[]>(`${this.url}/usuarios/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    //Obtiene la informacion de un usuario
    getWithId(id: string): Observable<EncomiendaModel>{
      return this.http.get<EncomiendaModel>(`${this.url}/usuarios/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    //Obtiene la cantidad de usuarios
    getCount(): Observable<EncomiendaModel[]>{
      return this.http.get<EncomiendaModel[]>(`${this.url}/usuarios/count`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
}