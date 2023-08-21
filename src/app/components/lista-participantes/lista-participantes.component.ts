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
    var participantes: Array<Usuario> = new Array<Usuario>;

    participantes.push(new Usuario(1,"Sussuaranus Caetana",1,"../../assets/susuarana.jpg"));
    participantes.push(new Usuario(1,"Maracas Virgulino", 2, "../../assets/maraca.jpg"));
    participantes.push(new Usuario(1,"Lobotomia Albuquerque", 3, "../../assets/Lobo.jpg"));
    this.listaParcipantes = participantes;
    this.mostrar = true;

  }


}
