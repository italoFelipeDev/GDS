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

  dailyLog: DailyLog = new DailyLog();

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

  private readonly ID_PROJETO_PATH = 'id';
  
  ngOnInit(): void {
    this.carregarDailyDisplay();
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
    ) { 
  }

  carregarDailyDisplay(){
    this.recuperarIdProjeto();
    this.carregarProjeto();
  }

  private carregarProjeto() {
    this.projetoService.getProjeto(this.idProjeto).subscribe(response => {
      this.projeto = response;
      this.carregarParticipantes();
    });
  }

  private carregarParticipantes() {
    this.projeto.participantesId.forEach(idParticipante => {
      this.carregarUsuario(idParticipante);
    });
  }

  private carregarUsuario(idParticipante: string) {
    this.usuarioService.getUsuario(idParticipante).subscribe(responseUser => {

      this.configurarParticipantesFaltantes(responseUser);
    });
  }

  private configurarParticipantesFaltantes(responseUser: Usuario) {
    let isParticipanteFaltante: boolean = false;
    this.projeto.faltasDoDia.forEach(falta => {
      if (falta.idUsuario == responseUser.id.toString()) {
        isParticipanteFaltante = true;
      }
    });
    if (!isParticipanteFaltante) {
      this.listaParcipantes.push(responseUser);
    }
    this.organizarListaParticipantes();
  }

  private organizarListaParticipantes() {
    this.listaParcipantes.sort((a, b) => a.nome.localeCompare(b.nome));
    this.definirOrdemParticipantes();
  }

  private definirOrdemParticipantes() {
    this.listaParcipantes.forEach((participante) => {
      participante.ordem = this.listaParcipantes.indexOf(participante);
    });
  }

  iniciarDaily():void{
    this.dailyIniciada = true;
    //Inicia Cronometros
    this.cronometro.startTimer();
    this.participanteLocutorComponent.iniciarCronometro();

    //Registra tempo de inicio da daily e primeiro participante
    this.inicioDaily = new Date().getTime();
    this.inicioReport = new Date().getTime();

    this.cd.detectChanges();
  }

  finalizarReport():void{
      this.listaParticipantesComponent.atualizarListaParticipante();
      this.participanteLocutorComponent.reiniciarCronometro();

      //Registra o tempo decorrido do report do usuário
      this.fimReport = new Date().getTime() - this.inicioReport;

      //Reinicia o registro para o proximo usuário
      this.inicioReport = new Date().getTime();

     this.definirDailyFinalizada();
      this.cd.detectChanges();
  }

  private definirDailyFinalizada() {
    if (this.listaParticipantesComponent.isfinalizarDaily()) {
      this.dailyFinalizada = true;
    }
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
      this.idProjeto = this.conversaoIdProjetoPath();
    }
  }

  private conversaoIdProjetoPath(): string {
    return this.route.snapshot.paramMap.get(this.ID_PROJETO_PATH) ? <string>this.route.snapshot.paramMap.get(this.ID_PROJETO_PATH) : "";
  }

  recuperarParticipanteLocutor(){
    this.participanteLocutor = this.listaParcipantes[0];
  }

  finalizarDaily(){
    //Registra Tempo decorrido da Daily
    this.fimDaily = new Date().getTime() - this.inicioDaily;
    this.dailyLog.tempoDecorrido = this.fimDaily/1000;
  }
}
