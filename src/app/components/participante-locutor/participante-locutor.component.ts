import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-participante-locutor',
  templateUrl: './participante-locutor.component.html',
  styleUrls: ['./participante-locutor.component.scss']
})
export class ParticipanteLocutorComponent implements OnInit{

  @Input() usuario: Usuario = new Usuario(1,"Sussuaranus Caetana",1,"../../assets/susuarana.jpg");

  constructor() { }
  
  ngOnInit(): void {
   
  }
}
