import { Component, Input, OnInit } from '@angular/core';
import { DailyLog } from 'src/model/dailyLog.class';
import { Projeto } from 'src/model/projeto.class';

@Component({
  selector: 'app-registro-daily',
  templateUrl: './registro-daily.component.html',
  styleUrls: ['./registro-daily.component.scss']
})
export class RegistroDailyComponent implements  OnInit{
  
  @Input() dailyLog: DailyLog;

  @Input() projeto: Projeto;

  constructor(){

  }

  ngOnInit(): void {
   
  }

  getDataDailyLog(): string{
    let dataDailyLog: Date = new Date(this.dailyLog.data);

    return dataDailyLog.toLocaleDateString();
  }

  avaliarTempoDaily(): string{
    return this.dailyLog.tempoDecorrido <= this.projeto.tempoMedioDeDaily ? 'btn-success' : 'btn-danger';
  }

  avaliarTempoReportUsuario(tempoDecorrido: number): string{

    return tempoDecorrido <= this.projeto.tempoMedioDeFala ? 'btn-success' : 'btn-danger';
  }

  avaliarNumeroReportPendente(): string{
    return this.dailyLog.impedimentosDoDiaList.length < 5 ? 'btn-success' : this.dailyLog.impedimentosDoDiaList.length < 10 ? 'btn-warning' : 'btn-danger'
  }
}
