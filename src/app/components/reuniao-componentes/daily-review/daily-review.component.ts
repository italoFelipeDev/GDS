import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { DailyLog } from 'src/model/dailyLog.class';
import { Projeto } from 'src/model/projeto.class';
import { RotaUtils } from 'src/utils/rota.class.utils';
import { RegistroDailyComponent } from '../../registro-daily/registro-daily.component';
import { ReportUsuarioLogConvertido } from 'src/model/reportUsuarioLogConvertido.class';

@Component({
  selector: 'app-daily-review',
  templateUrl: './daily-review.component.html',
  styleUrls: ['./daily-review.component.scss']
})
export class DailyReviewComponent implements OnInit {
  
  @Input() dailyLog: DailyLog = new DailyLog();

  @Input() projeto: Projeto = new Projeto();

  @ViewChild(RegistroDailyComponent) registroDaily: RegistroDailyComponent;

  modal: any;
  
  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
    ){

  }

  ngOnInit(): void {
  }

  abrirModal(){
    this.cd.detectChanges();
    this.registroDaily.carregarParticipantesProjeto();
    this.modal = new Modal('#dailyReviewModal');
    this.modal.show();
  }

  fecharModal(){
    this.modal.hide();
    this.router.navigate(RotaUtils.rotaHome());
  }
}
