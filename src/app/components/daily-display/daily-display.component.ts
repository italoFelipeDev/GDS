import { ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { CronometroComponent } from '../cronometro/cronometro.component';
import { ParticipanteLocutorComponent } from '../participante-locutor/participante-locutor.component';
import { Usuario } from 'src/model/usuario.class';
import { Impedimento } from 'src/model/impedimento.class';
import { ListaParticipantesComponent } from '../lista-participantes/lista-participantes.component';
import { UsuarioService} from 'src/app/service/usuario-service.service';

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
    this.loadDailyDisplay();
    
    
  }

  constructor(private cd: ChangeDetectorRef, private usuarioService: UsuarioService) { 

  }

  loadDailyDisplay(){
    this.usuarioService.getUsuarios().subscribe(response =>{ 
      this.listaParcipantes = <Array<Usuario>>response;
      
      var impedimentos = new Array<Impedimento>();
      impedimentos.push(new Impedimento("Probelma de infra", "Não cosnigo realizar deploy."));
      var impedimento = new Impedimento("Sem documentação", "Documentação da funcionalidade não dipsonível.");
      impedimento.solucionado = true;
      impedimentos.push(impedimento);
  
      this.listaParcipantes.forEach((participante) =>{
      participante.impedimentos = impedimentos;
      })
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
