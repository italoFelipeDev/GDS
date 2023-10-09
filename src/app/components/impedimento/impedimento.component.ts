import { Component, Input, OnInit } from '@angular/core';
import { ProjetoService } from 'src/app/service/projeto.service';
import { Impedimento } from 'src/model/impedimento.class';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';

@Component({
  selector: 'app-impedimento',
  templateUrl: './impedimento.component.html',
  styleUrls: ['./impedimento.component.scss']
})
export class ImpedimentoComponent implements OnInit {

  @Input() impedimento: Impedimento;

  @Input() projeto: Projeto;

  @Input() isDailyDisplay: boolean = false;

  usuarioLogado: Usuario;

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
    })
    this.atualizarImpedimento();
  }

  private atualizarImpedimento() {
    this.projetoService.putProjeto(this.projeto).subscribe(response => {
      location.reload();
    });
  }

  recuperarUsuarioLogado() {
      this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
  }

  isImpedimentoSolucionavel(): boolean{
   return (this.usuarioLogado.id == this.impedimento.idParticipante && !this.impedimento.solucionado);
  }
}
