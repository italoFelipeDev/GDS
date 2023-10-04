import { Component, Input, OnInit } from '@angular/core';
import { Projeto } from 'src/model/projeto.class';

@Component({
  selector: 'app-lista-falta',
  templateUrl: './lista-falta.component.html',
  styleUrls: ['./lista-falta.component.scss']
})
export class ListaFaltaComponent implements OnInit {

  @Input() projeto: Projeto;
  
  constructor(){

  }

  ngOnInit(): void {
  }

}
