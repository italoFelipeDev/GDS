import { Component,Input, OnInit } from '@angular/core';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.scss']
})
export class ParticipanteComponent implements OnInit{

  id: number;
  @Input() nome: string;
  @Input() ordem: number;
  @Input() icone: string;
  @Input() usuario: Usuario;
  reportFeito: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }
}
