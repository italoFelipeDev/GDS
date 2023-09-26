import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/model/usuario.class';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{

  baseUrl ="http://localhost:3000/usuarios";

  constructor(private httpClient: HttpClient) { }

  getUsuarios(): Observable<Array<Usuario>>{
    return this.httpClient.get<Array<Usuario>>(this.baseUrl);
  }

  getUsuario(id: string): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  postUsuario(usuario:Usuario) : Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.baseUrl,usuario);
  }

  putUsuario(usuario:Usuario): Observable<Usuario>{
    return this.httpClient.put<Usuario>(`${this.baseUrl}/${usuario.id}`,usuario);
  }
}
