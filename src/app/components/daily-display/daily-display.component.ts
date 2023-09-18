import { ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { CronometroComponent } from '../cronometro/cronometro.component';
import { ParticipanteLocutorComponent } from '../participante-locutor/participante-locutor.component';
import { Usuario } from 'src/model/usuario.class';
import { Impedimento } from 'src/model/impedimento.class';
import { ListaParticipantesComponent } from '../lista-participantes/lista-participantes.component';

@Component({
  selector: 'app-daily-display',
  templateUrl: './daily-display.component.html',
  styleUrls: ['./daily-display.component.scss']
})
export class DailyDisplayComponent implements OnInit{

  @ViewChild(CronometroComponent) cronometro: CronometroComponent;

  @ViewChild(ParticipanteLocutorComponent) participanteLocutor: ParticipanteLocutorComponent;

  @ViewChild(ListaParticipantesComponent) ListaParticipantesComponent: ListaParticipantesComponent;

  listaParcipantes: Array<Usuario>;

  participanteOrador: Usuario;
  
  dailyIniciada: boolean = false;
  
  ngOnInit(): void {

    this.participanteOrador = this.listaParcipantes[0];
    
  }

  constructor(private cd: ChangeDetectorRef) { 
    var participantes = new Array<Usuario>();
    
    participantes.push(new Usuario("José Silva","../../assets/Pessoa3.jpg",'',''));
    participantes.push(new Usuario("João Virgulino", "../../assets/Pessoa.jpg",'',''));
    participantes.push(new Usuario("Carlos Albuquerque", "../../assets/Pessoa2.webp",'',''));
    
    this.listaParcipantes = participantes;
    var impedimentos = new Array<Impedimento>();
    impedimentos.push(new Impedimento("Probelma de infra", "Não cosnigo realizar deploy."));
    var impedimento = new Impedimento("Sem documentação", "Documentação da funcionalidade não dipsonível.");
    impedimento.solucionado = true;
    impedimentos.push(impedimento);
  
    participantes.forEach((participante) =>{
      participante.impedimentos = impedimentos;
    })
  }

  iniciarDaily():void{
    this.dailyIniciada = true;
    this.cronometro.startTimer();
    this.participanteLocutor.iniciarCronometro();
    this.cd.detectChanges();
  }

  finalizarReport():void{
      this.ListaParticipantesComponent.updateListaParticipante();
      this.participanteLocutor.reiniciarCronometro();
      this.cd.detectChanges()
  }

  prosseguirDaily(){
    if(this.dailyIniciada){
      this.finalizarReport();
    }
    if(!this.dailyIniciada){
      this.iniciarDaily();

    }
  }

  isDailyIniciada(){
    return this.dailyIniciada;
  }
}
