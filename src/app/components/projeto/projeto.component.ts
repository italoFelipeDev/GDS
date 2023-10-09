import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Projeto } from 'src/model/projeto.class';
import { RotaUtils } from 'src/utils/rota.class.utils';
import { ToastComponent } from '../toast/toast.component';
import { ToastMensagemUtil } from 'src/utils/toastMensagem.class.util';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent  implements OnInit{

  @Input() projeto: Projeto;

  @ViewChild(ToastComponent) toastProjeto: ToastComponent;

  private readonly NUMERO_MINIMO_PARTICIPANTES_DAILY = 2;

  constructor(
    private router: Router
  ){

  }

  ngOnInit(): void {
  }

  direcionarProjetoView(){
    this.router.navigate(RotaUtils.rotaProjeto(this.projeto.id.toString()));
  }

  direcionarProjetoDaily(){
    if(this.isDailyViavel()){
      this.router.navigate(RotaUtils.rotaProjetoDaily(this.projeto.id.toString()));
    }else{
      this.toastProjeto.mostrarToast(ToastMensagemUtil.ERRO_INCIAR_DAILY_TITULO, ToastMensagemUtil.ERRO_INCIAR_DAILY_DESCRICAO);
    }
    
  }

  getNumeroDeImpedimentos(): string{
    return this.projeto.impedimentos.length.toString();
  }

  getNumeroDeParticipantes(): string{
    return this.projeto.participantesId.length.toString();
  }

  getNumeroDeFaltas(): string{
    return this.projeto.faltasDoDia.length.toString();
  }

  isDailyViavel(): boolean{
    return (this.projeto.participantesId.length - this.projeto.faltasDoDia.length) >= this.NUMERO_MINIMO_PARTICIPANTES_DAILY;
  }
}
