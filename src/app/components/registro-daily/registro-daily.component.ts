import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { DailyLog } from 'src/model/dailyLog.class';
import { Projeto } from 'src/model/projeto.class';
import { ReportUsuarioLogConvertido } from 'src/model/reportUsuarioLogConvertido.class';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-registro-daily',
  templateUrl: './registro-daily.component.html',
  styleUrls: ['./registro-daily.component.scss']
})
export class RegistroDailyComponent implements  OnInit{
  
  @Input() dailyLog: DailyLog;

  @Input() projeto: Projeto;

  @Input() listaParticipante: Array<Usuario> = new Array<Usuario>();

  reportsUsuarioConvertido: Array<ReportUsuarioLogConvertido> = new Array<ReportUsuarioLogConvertido>();

  constructor(
    private cd: ChangeDetectorRef,
    private usuarioService: UsuarioService
    ){

  }

  ngOnInit(): void {
   this.carregarParticipantesProjeto();
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

  carregarParticipantesProjeto(){
    this.dailyLog.tempoDecorridoReports.forEach(report => {
      this.usuarioService.getUsuario(report.usuarioId).subscribe(response =>{
        this.reportsUsuarioConvertido.push(new ReportUsuarioLogConvertido(response, report.tempoDecorrido));
        this.cd.detectChanges();
      })
    })
    
  }
}
