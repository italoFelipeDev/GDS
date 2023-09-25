import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projeto } from 'src/model/projeto.class';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  baseURL = "http://localhost:3000/projetos"
  constructor(private httpClient: HttpClient) { }

  getProjetos(){
    return this.httpClient.get(this.baseURL);
  }

  getProjeto(id: string):Observable<Projeto>{
    return this.httpClient.get<Projeto>(`${this.baseURL}/${id}`);
  }

  postProjeto(projeto:Projeto):Observable<Projeto>{
    return this.httpClient.post<Projeto>(this.baseURL,projeto);
  }

  putProjeto(projeto:Projeto):Observable<void>{
    return this.httpClient.put<void>(`${this.baseURL}/${projeto.id}`,projeto);
  }
}
