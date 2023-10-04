import { Component, Input, OnInit } from '@angular/core';
import { Projeto } from 'src/model/projeto.class';

@Component({
  selector: 'app-lista-impedimento',
  templateUrl: './lista-impedimento.component.html',
  styleUrls: ['./lista-impedimento.component.scss']
})
export class ListaImpedimentoComponent implements OnInit {
  
  @Input() projeto: Projeto;

  ngOnInit(): void {
    
  }

  temImpedimento(): boolean{
    return this.projeto.impedimentos.length > 0
  }
}
