import { Component, OnInit, ViewChild } from '@angular/core';
import { CronometroComponent } from '../cronometro/cronometro.component';
import { ParticipanteLocutorComponent } from '../participante-locutor/participante-locutor.component';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-daily-display',
  templateUrl: './daily-display.component.html',
  styleUrls: ['./daily-display.component.scss']
})
export class DailyDisplayComponent implements OnInit{

  @ViewChild(CronometroComponent) cronometro: CronometroComponent;

  @ViewChild(ParticipanteLocutorComponent) participanteLocutor: ParticipanteLocutorComponent

  listaParcipantes: Array<Usuario>;


  
  ngOnInit(): void {
    
  }

  constructor() { 
    var participantes = new Array<Usuario>();
    
    participantes.push(new Usuario(1,"Sussuaranus Caetana",1,"../../assets/susuarana.jpg"));
    participantes.push(new Usuario(1,"Maracas Virgulino", 2, "../../assets/maraca.jpg"));
    participantes.push(new Usuario(1,"Lobotomia Albuquerque", 3, "../../assets/Lobo.jpg"));
    this.listaParcipantes = participantes;
  }

  iniciarCronometro():void{
    this.cronometro.startTimer();
    this.participanteLocutor.iniciarCronometro();
  }


}
