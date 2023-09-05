import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-lista-participantes',
  templateUrl: './lista-participantes.component.html',
  styleUrls: ['./lista-participantes.component.scss']
})
export class ListaParticipantesComponent  implements OnInit{

  @Input() listaParcipantes: Array<Usuario>;

  mostrar: boolean;
  
  constructor() { }

  ngOnInit(): void {
    this.mostrar = true;

    this.listaParcipantes.sort((a, b) => a.nome.localeCompare(b.nome));
    this.listaParcipantes.forEach((participante)=>{
      participante.ordem = this.listaParcipantes.indexOf(participante) + 1
    })
  }


}
