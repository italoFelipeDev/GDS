import { Component, Input, OnInit } from '@angular/core';
import { Collapse } from 'bootstrap';
import { DailyLog } from 'src/model/dailyLog.class';
import { Projeto } from 'src/model/projeto.class';

@Component({
  selector: 'app-lista-registro-daily',
  templateUrl: './lista-registro-daily.component.html',
  styleUrls: ['./lista-registro-daily.component.scss']
})
export class ListaRegistroDailyComponent implements OnInit{
  
  @Input() projeto: Projeto;

  constructor(){

  }

  ngOnInit(): void {
  }

  temRegistro(): boolean{
    return this.projeto.logReunioes.length > 0;
  }

  getDataDailyLog(dailyLog: DailyLog): string{
    let dataDailyLog: Date = new Date(dailyLog.data);

    return dataDailyLog.toLocaleDateString();
  }

  getDataDailyLogMili(dailyLog: DailyLog){
    let dataDailyLog: Date = new Date(dailyLog.data);

    return dataDailyLog.getMilliseconds().toString();
  }

  collapse(data: string): void{
    let collapse = new Collapse('#collapseRegistroDaily' + data);
    collapse.hide();
  }
}
