import { Component, Input, OnInit } from '@angular/core';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Impedimento } from 'src/model/impedimento.class';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-impedimento',
  templateUrl: './impedimento.component.html',
  styleUrls: ['./impedimento.component.scss']
})
export class ImpedimentoComponent implements OnInit {

  @Input() impedimento: Impedimento;

  @Input() projeto: Projeto;

  UsuarioLogado: Usuario;

  constructor(
    private projetoService: ProjetoService
  ) {

  }
  ngOnInit(): void {
    this.recuperarUsuarioLogado();
  }

  getDataInicioImpedimento() {
    const dataInicio: Date = new Date(this.impedimento.dataInicio)
    return dataInicio.toLocaleDateString();
  }

  getDataFimImpedimento() {
    const dataFim: Date = new Date(this.impedimento.dataFim)
    return dataFim.toLocaleDateString();
  }

  declararSolucionado() {
    this.projeto.impedimentos.forEach(impedimento =>{
      if(impedimento.titulo == this.impedimento.titulo){
        impedimento.solucionado = true;
        impedimento.dataFim = new Date();
      }
      this.projetoService.putProjeto(this.projeto).subscribe(response =>{
        location.reload();
      });
    })
  }

  recuperarUsuarioLogado() {
    if (window.localStorage.getItem("usuarioLogado")) {
      let usuarioLogado: string = window.localStorage.getItem("usuarioLogado") ? <string>window.localStorage.getItem("usuarioLogado") : ''
      this.UsuarioLogado = JSON.parse(usuarioLogado);
    }
  }
}
