import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/model/usuario.class';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{

  constructor(private httpClient: HttpClient) { }

  getUsuarios(){
    return this.httpClient.get("http://localhost:3000/usuarios");
  }

  postUsuario(usuario:Usuario){
    return this.httpClient.post("http://localhost:3000/usuarios",usuario);
  }
}
