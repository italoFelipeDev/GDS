import { Component, OnInit, ViewChild } from '@angular/core';
import { CronometroComponent } from '../cronometro/cronometro.component';
import { ParticipanteLocutorComponent } from '../participante-locutor/participante-locutor.component';

@Component({
  selector: 'app-daily-display',
  templateUrl: './daily-display.component.html',
  styleUrls: ['./daily-display.component.scss']
})
export class DailyDisplayComponent implements OnInit{

  @ViewChild(CronometroComponent) cronometro: CronometroComponent;

  @ViewChild(ParticipanteLocutorComponent) participanteLocutor: ParticipanteLocutorComponent
  
  ngOnInit(): void {
    this.participanteLocutor.iniciarCronometro();
  }

  constructor() { }

  iniciarCronometro():void{
    this.cronometro.startTimer();
  }


}
