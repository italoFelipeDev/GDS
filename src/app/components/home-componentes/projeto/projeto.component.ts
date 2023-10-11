import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Projeto } from 'src/model/projeto.class';
import { RotaUtils } from 'src/utils/rota.class.util';
import { ToastComponent } from '../../util/toast/toast.component';
import { ToastMensagemUtil } from 'src/utils/toastMensagem.class.util';
import { DailyLog } from 'src/model/dailyLog.class';
import { StringUtil } from 'src/utils/string.class.util';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {

  @Input() projeto: Projeto;

  @ViewChild(ToastComponent) toastProjeto: ToastComponent;

  private readonly NUMERO_MINIMO_PARTICIPANTES_DAILY = 2;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  direcionarProjetoView(): void {
    this.router.navigate(RotaUtils.rotaProjeto(this.projeto.id.toString()));
  }

  direcionarProjetoDaily(): void {
    if (this.isDailyViavel()) {
      this.router.navigate(RotaUtils.rotaProjetoDaily(this.projeto.id.toString()));
    } else {
      this.toastProjeto.mostrarToast(ToastMensagemUtil.ERRO_INCIAR_DAILY_TITULO, ToastMensagemUtil.ERRO_INCIAR_DAILY_DESCRICAO);
    }

  }

  getNumeroDeImpedimentos(): string {
    let filtroImpedimentoPendente =this.projeto.impedimentos.filter( novaLista =>{
      return novaLista.solucionado != true;
    });
    return filtroImpedimentoPendente.length.toString();
  }

  getNumeroDeParticipantes(): string {
    return this.projeto.participantesId.length.toString();
  }

  getNumeroDeFaltas(): string {
    return this.projeto.faltasDoDia.length.toString();
  }

  isDailyViavel(): boolean {
    return (this.isNumeroParticipantesSuficiente() && !this.isDailyRealizada())
  }

  private isNumeroParticipantesSuficiente(): boolean {
    return (this.projeto.participantesId.length - this.projeto.faltasDoDia.length) >= this.NUMERO_MINIMO_PARTICIPANTES_DAILY;
  }

  isDailyRealizada(): boolean {
    let dailyRealizada = false;
    this.projeto.logReunioes.forEach(log => {
      let { diaLog, hoje }: { diaLog: Date; hoje: Date; } = this.converterDatas(log);
      if (diaLog.getDate() == hoje.getDate()) {
        dailyRealizada = true;
      }
    })
    return dailyRealizada;
  }

  formatarHorarioDaily(): string{
   
    return StringUtil.formatarHorario(this.projeto.horarioReuniaoHoras, this.projeto.horarioReuniaoMinutos);
  }

  private converterDatas(log: DailyLog) {
    let diaLog: Date = new Date(log.data);
    let hoje: Date = new Date();
    return { diaLog, hoje };
  }
}
