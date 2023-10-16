import { Component, Input, OnInit } from '@angular/core';
import { DailyLog } from 'src/model/dailyLog.class';
import { Projeto } from 'src/model/projeto.class';
import { RelatorioMensal } from 'src/model/relatorioMensal.class';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit{
  
  @Input() projeto: Projeto;

  @Input() relatorioMensal: RelatorioMensal;
  
  constructor(){

  }

  ngOnInit(): void {
  }

  getMesDailyLog(dailyLog: DailyLog){

    let dailyLogConvertido: Date = new Date(dailyLog.data);

    let dailyLogMes: number = dailyLogConvertido.getMonth();

    return dailyLogMes
  }

  getAnoDailyLog(dailyLog: DailyLog){

    let dailyLogConvertido: Date = new Date(dailyLog.data);

    let dailyLogAno: number = dailyLogConvertido.getFullYear();

    return dailyLogAno;
  }

  getTotalDeDailys(){
    return this.relatorioMensal.dailyLogMensal.length.toString();
  }

  getMediaTempoDecorridoDailyMensal(): number{
    let tempoTotal: number = 0;
    this.relatorioMensal.dailyLogMensal.forEach(dailyLog =>{
      tempoTotal += dailyLog.tempoDecorrido;
    })

    return (tempoTotal / this.relatorioMensal.dailyLogMensal.length);
  }


  getMediaTempoDecorridoReportMensal(): number{
    let tempoTotal: number = 0;
    this.relatorioMensal.dailyLogMensal.forEach(dailyLog =>{
      tempoTotal += dailyLog.tempoMedioReports;
    })

    return (tempoTotal / this.relatorioMensal.dailyLogMensal.length);
  }

  avaliarTempoDaily(): string{
    return this.getMediaTempoDecorridoDailyMensal() <= this.projeto.tempoMedioDeDaily ? 'btn-success' : 'btn-danger';
  }

  avaliarTempoReport(): string{
    return this.getMediaTempoDecorridoReportMensal() <= this.projeto.tempoMedioDeFala ? 'btn-success' : 'btn-danger';
  }

  private organizarListaDailyTempo(listDailyLog: Array<DailyLog>): Array<DailyLog> {
    return listDailyLog.sort((a => a.tempoDecorrido));
  }

  getDailyMaisLonga(){
    if(this.relatorioMensal.dailyLogMensal.length > 0){
      return this.organizarListaDailyTempo(this.relatorioMensal.dailyLogMensal)[0].tempoDecorrido;
    } else{
      return 0;
    }
  }
}
