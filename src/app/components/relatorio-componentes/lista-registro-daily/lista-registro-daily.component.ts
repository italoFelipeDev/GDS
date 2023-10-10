import { Component, Input, OnInit } from '@angular/core';
import { Projeto } from 'src/model/projeto.class';

@Component({
  selector: 'app-lista-registro-daily',
  templateUrl: './lista-registro-daily.component.html',
  styleUrls: ['./lista-registro-daily.component.scss']
})
export class ListaRegistroDailyComponent implements OnInit{
  
  @Input() projeto: Projeto;

  constructor(){

  }

  ngOnInit(): void {
  }

  temRegistro(): boolean{
    return this.projeto.logReunioes.length > 0;
  }

}
