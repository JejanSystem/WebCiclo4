import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioModel } from '../modelos/servicio.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 
      this.token = this.seguridadService.getToken();
    }

    store(usuario: ServicioModel): Observable<ServicioModel> {
      return this.http.post<ServicioModel>(`${this.url}/servicios`, {
        id: usuario.id,
        origen: usuario.origen,
        destino: usuario.destino,
        fecha: usuario.fecha,
        hora: usuario.hora,
        encomienda: usuario.encomienda,
        valor: usuario.encomienda,
      });
    }
  }   