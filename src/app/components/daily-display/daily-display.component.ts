import { ChangeDetectorRef, Component, EventEmitter, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CronometroComponent } from '../cronometro/cronometro.component';
import { ParticipanteLocutorComponent } from '../participante-locutor/participante-locutor.component';
import { Usuario } from 'src/model/usuario.class';
import { Impedimento } from 'src/model/impedimento.class';
import { ListaParticipantesComponent } from '../lista-participantes/lista-participantes.component';
import { UsuarioService} from 'src/app/service/usuario-service.service';
import { DailyLog } from 'src/model/dailyLog.class';
import { ProjetoService } from 'src/app/service/projeto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto } from 'src/model/projeto.class';

@Component({
  selector: 'app-daily-display',
  templateUrl: './daily-display.component.html',
  styleUrls: ['./daily-display.component.scss']
})
export class DailyDisplayComponent implements OnInit{

  @ViewChild(CronometroComponent) cronometro: CronometroComponent;

  @ViewChild(ParticipanteLocutorComponent) participanteLocutorComponent: ParticipanteLocutorComponent;

  @ViewChild(ListaParticipantesComponent) listaParticipantesComponent: ListaParticipantesComponent;

  dailyLog: DailyLog;

  projeto: Projeto;

  listaParcipantes: Array<Usuario> = new Array<Usuario>;

  participanteLocutor: any;
  
  dailyIniciada: boolean = false;

  idProjeto: string;

  inicioReport: number;

  fimReport: number;

  inicioDaily: number;

  fimDaily: number;

  dailyFinalizada: boolean = false;
  
  ngOnInit(): void {
    this.iniciarComponente();
    this.loadDailyDisplay();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['usuario'].currentValue) {
    }
}

  constructor(
    private cd: ChangeDetectorRef, 
    private usuarioService: UsuarioService,
    private projetoService: ProjetoService,
    private route: ActivatedRoute,
    private router: Router) { 

  }

  private iniciarComponente() {
    this.recuperarIdProjeto();
    this.dailyLog = new DailyLog();
    this.dailyLog.data = new Date();
  }

  loadDailyDisplay(){
    this.projetoService.getProjeto(this.idProjeto).subscribe(response =>{
      this.projeto = response;
      this.projeto.participantesId.forEach(idParticipante =>{
        this.usuarioService.getUsuario(idParticipante).subscribe(responseUser =>{
          this.listaParcipantes.push(responseUser);
          this.organizarListaParticipantes();
        })
      })
    })
  }

  private organizarListaParticipantes() {
    this.listaParcipantes.sort((a, b) => a.nome.localeCompare(b.nome));
    this.listaParcipantes.forEach((participante) => {
      participante.ordem = this.listaParcipantes.indexOf(participante);
    });
  }

  iniciarDaily():void{
    this.dailyIniciada = true;
    this.cronometro.startTimer();
    this.participanteLocutorComponent.iniciarCronometro();

    this.inicioDaily = new Date().getTime();

    this.inicioReport = new Date().getTime();

    this.cd.detectChanges();
  }

  finalizarReport():void{
      this.listaParticipantesComponent.updateListaParticipante();
      this.participanteLocutorComponent.reiniciarCronometro();

      this.fimReport = new Date().getTime() - this.inicioReport;
      this.inicioReport = new Date().getTime();

     if(this.listaParticipantesComponent.isfinalizarDaily()){
      this.dailyFinalizada = true;
     }
      this.cd.detectChanges();
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

  recuperarIdProjeto() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.idProjeto = this.route.snapshot.paramMap.get('id') ? <string>this.route.snapshot.paramMap.get('id') : "";
    }
  }

  recuperarParticipanteLocutor(){
    this.participanteLocutor = this.listaParcipantes[0];
  }

  finalizarDaily(){
    this.fimDaily = new Date().getTime() - this.inicioDaily;
    this.dailyLog.tempoDecorrido = this.fimDaily/1000;
  }
}
