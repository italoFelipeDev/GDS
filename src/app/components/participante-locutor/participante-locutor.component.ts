import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Impedimento } from 'src/model/impedimento.class';
import { Usuario } from 'src/model/usuario.class';
import { CronometroComponent } from '../cronometro/cronometro.component';

@Component({
  selector: 'app-participante-locutor',
  templateUrl: './participante-locutor.component.html',
  styleUrls: ['./participante-locutor.component.scss']
})
export class ParticipanteLocutorComponent implements OnInit{

  @Input() usuario: Usuario;

  @Input() tempoExtrapoladoLocutor: number;

  @Input() impedimentoList: Array<Impedimento>;

  @ViewChild(CronometroComponent) cronometro: CronometroComponent;

  constructor(private cd: ChangeDetectorRef) { }
  
  ngOnInit(): void {
  }

  iniciarCronometro():void{
    this.cronometro.startTimer();
    this.cd.detectChanges();
  }

  reiniciarCronometro():void{
    this.cronometro.resetTimer();
    this.cd.detectChanges();
  }
}
