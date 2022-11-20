import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteModel } from '../modelos/cliente.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 
      this.token = this.seguridadService.getToken();
    }
    //Crear un usuario
    store(usuario: ClienteModel): Observable<ClienteModel> {
      return this.http.post<ClienteModel>(`${this.url}/clientes`, {
        nombre: usuario.nombre,
        apellidos: usuario.apellido,
        telefono: usuario.telefono,
        correo: usuario.correo
      });
    }
    //Obtiene todos los usuarios
    getAll(): Observable<ClienteModel[]>{
      return this.http.get<ClienteModel[]>(`${this.url}/clientes`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    //Actualiza un usuario
    update(usuario: ClienteModel): Observable<ClienteModel> {
      return this.http.patch<ClienteModel>(`${this.url}/usuarios/${usuario.id}`, {
        nombre: usuario.nombre,
        apellidos: usuario.apellido,
        telefono: usuario.telefono,
        correo: usuario.correo
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }
    //Elimina un usuario
    delete(id: string): Observable<ClienteModel[]>{
      return this.http.delete<ClienteModel[]>(`${this.url}/usuarios/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    //Obtiene la informacion de un usuario
    getWithId(id: string): Observable<ClienteModel>{
      return this.http.get<ClienteModel>(`${this.url}/usuarios/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    //Obtiene la cantidad de usuarios
    getCount(): Observable<ClienteModel[]>{
      return this.http.get<ClienteModel[]>(`${this.url}/usuarios/count`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
}