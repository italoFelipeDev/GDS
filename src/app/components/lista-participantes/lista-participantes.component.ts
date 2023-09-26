import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-lista-participantes',
  templateUrl: './lista-participantes.component.html',
  styleUrls: ['./lista-participantes.component.scss']
})
export class ListaParticipantesComponent implements OnInit{

  @Input() listaParcipantes: Array<Usuario>;

  mostrar: boolean;
  
  listaReportConcluido: Array<Usuario> = new Array<Usuario>();

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.organizarListaParticipantes();
  }

  private organizarListaParticipantes() {
    this.mostrar = true;

    this.listaParcipantes.sort((a, b) => a.nome.localeCompare(b.nome));
    this.listaParcipantes.forEach((participante) => {
      participante.ordem = this.listaParcipantes.indexOf(participante) + 1;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.listaParcipantes = this.listaParcipantes;
  }

  updateListaParticipante(){
    if(this.listaParcipantes.length != 0){
      this.addListaReportConcluido(this.listaParcipantes[0]);
      this.listaParcipantes.shift();
      this.cd.detectChanges();
    }
   
  }
  addListaReportConcluido(usuario: Usuario){
    this.listaReportConcluido.push(usuario);
    this.cd.detectChanges();
  }

  

}
