import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projeto } from 'src/model/projeto.class';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor(private httpClient: HttpClient) { }

  getProjetos(){
    return this.httpClient.get("http://localhost:3000/projetos");
  }

  postProjeto(projeto:Projeto){
    return this.httpClient.post("http://localhost:3000/projetos",projeto);
  }
}
