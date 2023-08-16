import { Component,Input, OnInit } from '@angular/core';

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
  
  constructor() { }

  ngOnInit(): void {
  }
}
