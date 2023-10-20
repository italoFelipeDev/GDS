import { Component, Input, OnInit } from '@angular/core';
import { Collapse } from 'bootstrap';
import { DailyLog } from 'src/model/dailyLog.class';
import { Projeto } from 'src/model/projeto.class';
import { DateUtils } from 'src/utils/date.class.util';

@Component({
  selector: 'app-lista-registro-daily',
  templateUrl: './lista-registro-daily.component.html',
  styleUrls: ['./lista-registro-daily.component.scss']
})
export class ListaRegistroDailyComponent implements OnInit{
  
  @Input() projeto: Projeto;

  listaDailyLog: Array<DailyLog> = new Array<DailyLog>();

  constructor(){

  }

  ngOnInit(): void {

    this.organizalListaDailyLog();
  }

  temRegistro(): boolean{
    return this.projeto.logReunioes.length > 0;
  }

  getDataDailyLog(dailyLog: DailyLog): string{
    let dataDailyLog: Date = new Date(dailyLog.data);

    return dataDailyLog.toLocaleDateString();
  }

  organizalListaDailyLog(){
    
    this.listaDailyLog = this.projeto.logReunioes.sort((a, b) => {
      let dataConvertidaA: Date = DateUtils.converterDataObjeto(a.data);

      let dataConvertidaB: Date = DateUtils.converterDataObjeto(b.data);

      if(dataConvertidaA.getMilliseconds() > dataConvertidaB.getMilliseconds()){
        return -1;
      }

      if(dataConvertidaB.getMilliseconds() > dataConvertidaA.getMilliseconds()){
        return 1
      }

      return 0;
    });
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
