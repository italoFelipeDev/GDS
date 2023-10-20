import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { DailyLog } from 'src/model/dailyLog.class';
import { Projeto } from 'src/model/projeto.class';
import { RelatorioMensal } from 'src/model/relatorioMensal.class';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {

  @Input() projeto: Projeto;

  @Input() relatorioMensal: RelatorioMensal;

  @Input() listaParticipantes: Array<Usuario> = new Array<Usuario>();

  constructor(
    private usuarioService: UsuarioService
  ) {

  }

  ngOnInit(): void {
  }

  getMesDailyLog(dailyLog: DailyLog) {

    let dailyLogConvertido: Date = new Date(dailyLog.data);

    let dailyLogMes: number = dailyLogConvertido.getMonth();

    return dailyLogMes
  }

  getAnoDailyLog(dailyLog: DailyLog) {

    let dailyLogConvertido: Date = new Date(dailyLog.data);

    let dailyLogAno: number = dailyLogConvertido.getFullYear();

    return dailyLogAno;
  }

  getTotalDeDailys() {
    return this.relatorioMensal.dailyLogMensal.length.toString();
  }

  getMediaTempoDecorridoDailyMensal(): number {
    let tempoTotal: number = 0;
    this.relatorioMensal.dailyLogMensal.forEach(dailyLog => {
      tempoTotal += dailyLog.tempoDecorrido;
    })

    return (tempoTotal / this.relatorioMensal.dailyLogMensal.length);
  }


  getMediaTempoDecorridoReportMensal(): number {
    let tempoTotal: number = 0;
    this.relatorioMensal.dailyLogMensal.forEach(dailyLog => {
      tempoTotal += dailyLog.tempoMedioReports;
    })

    return (tempoTotal / this.relatorioMensal.dailyLogMensal.length);
  }

  avaliarTempoDaily(): string {
    return this.getMediaTempoDecorridoDailyMensal() <= this.projeto.tempoMedioDeDaily ? 'btn-success' : 'btn-danger';
  }

  avaliarTempoReportMediaGeral(): string {
    return this.getMediaTempoDecorridoReportMensal() <= this.projeto.tempoMedioDeFala ? 'btn-success' : 'btn-danger';
  }

  private organizarListaDailyTempo(listDailyLog: Array<DailyLog>): Array<DailyLog> {
    return listDailyLog.sort((a => a.tempoDecorrido));
  }

  getDailyMaisLonga() {
    if (this.relatorioMensal.dailyLogMensal.length > 0) {
      return this.organizarListaDailyTempo(this.relatorioMensal.dailyLogMensal)[0].tempoDecorrido;
    } else {
      return 0;
    }
  }

  getTempoTotalReunioes() {
    let tempoTotal: number = 0
    if (this.relatorioMensal.dailyLogMensal.length > 0) {
      this.relatorioMensal.dailyLogMensal.forEach(dailyLog => {
        tempoTotal += dailyLog.tempoDecorrido;
      })
    }
    return tempoTotal;
  }

  getTempoMedioFalaUsuario(usuario: Usuario): number {
    let tempoTotalFalaUsuario: number = 0;
    let totalReports: number = 0

    this.relatorioMensal.dailyLogMensal.forEach(dailyLog => {
      dailyLog.tempoDecorridoReports.forEach(report => {
        if (report.usuarioId == usuario.id.toString()) {
          tempoTotalFalaUsuario += report.tempoDecorrido;
          totalReports ++;
        }
      });
    });
    return tempoTotalFalaUsuario/totalReports;
  }
}
