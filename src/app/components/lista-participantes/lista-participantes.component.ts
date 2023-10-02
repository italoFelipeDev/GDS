import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-lista-participantes',
  templateUrl: './lista-participantes.component.html',
  styleUrls: ['./lista-participantes.component.scss']
})
export class ListaParticipantesComponent implements OnInit {

  @Input() listaParcipantes: Array<Usuario>;

  listaReportConcluido: Array<Usuario> = new Array<Usuario>();

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.detectarMudancasLista();
  }

  private detectarMudancasLista() {
    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.listaParcipantes = this.listaParcipantes;
  }

  atualizarListaParticipante() {
    if (this.listaParcipantes.length != 0) {
      this.addListaReportConcluido(this.listaParcipantes[0]);
      this.listaParcipantes.shift();
      this.cd.detectChanges();
    }

  }

  addListaReportConcluido(usuario: Usuario) {
    this.listaReportConcluido.push(usuario);
    this.cd.detectChanges();
  }

  isfinalizarDaily(): boolean {
    return this.listaParcipantes.length == 1;
  }

  isParticipanteLocutor(participante: Usuario): boolean {
    return participante == this.listaParcipantes[0];
  }
}
