import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Impedimento } from 'src/model/impedimento.class';
import { Usuario } from 'src/model/usuario.class';
import { CronometroComponent } from '../../cronometro/cronometro.component';

@Component({
  selector: 'app-participante-locutor',
  templateUrl: './participante-locutor.component.html',
  styleUrls: ['./participante-locutor.component.scss']
})
export class ParticipanteLocutorComponent implements OnInit {

  @Input() usuario: Usuario;

  @Input() tempoExtrapoladoLocutor: number;

  @Input() impedimentoList: Array<Impedimento>;

  @ViewChild(CronometroComponent) cronometro: CronometroComponent;

  isNenhumImpedmiento: boolean = true;

  isNenhumImpedimentoSuperado: boolean = true;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.checarListaImpedimento();
  }

  iniciarCronometro(): void {
    this.cronometro.startTimer();
    this.cd.detectChanges();
  }

  reiniciarCronometro(): void {
    this.cronometro.resetTimer();
    this.cd.detectChanges();
  }

  isImpedimentoUsuarioLocutor(impedimento: Impedimento): boolean{
    return !impedimento.solucionado && this.usuario.id == impedimento.idParticipante
  }

  isImpedimentoUsuarioLocutorSolucionado(impedimento: Impedimento): boolean{
    return impedimento.solucionado && this.usuario.id == impedimento.idParticipante
  }

  checarListaImpedimento(): boolean{
    let semImpedimentoAtual: boolean = true;
    this.impedimentoList.forEach(impedimento =>{
      
      if(impedimento.solucionado && this.usuario.id == impedimento.idParticipante){
        semImpedimentoAtual = false;
      }
    })

   return semImpedimentoAtual;
  }

  checarListaImpedimentoSuperado(): boolean{

    let semImpedimentoSuperado: boolean = true;

    this.impedimentoList.forEach(impedimento =>{
      let dataFimImpedimento: Date = new Date(impedimento.dataFim);

      let diaAtual: Date = new Date();

      let diaAnterior = diaAtual.getDate() - 1;

      if(this.isImpedimentoUsuarioLocutorSolucionado(impedimento) && dataFimImpedimento.getDate() >= diaAnterior){
        semImpedimentoSuperado = false;
      }
    })

   return semImpedimentoSuperado;
  }
}
