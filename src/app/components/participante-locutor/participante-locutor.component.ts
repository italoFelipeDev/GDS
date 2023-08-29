import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Impedimento } from 'src/model/impedimento.class';
import { Usuario } from 'src/model/usuario.class';
import { CronometroComponent } from '../cronometro/cronometro.component';

@Component({
  selector: 'app-participante-locutor',
  templateUrl: './participante-locutor.component.html',
  styleUrls: ['./participante-locutor.component.scss']
})
export class ParticipanteLocutorComponent implements OnInit{

  @Input() usuario: Usuario = new Usuario(1,"Sussuaranus Caetana",1,"../../assets/susuarana.jpg");

  @ViewChild(CronometroComponent) cronometro: CronometroComponent;

  constructor() { }
  
  ngOnInit(): void {
   var impedimentos = new Array<Impedimento>();
   impedimentos.push(new Impedimento("Lavar o canteiro", "Não cosnigo lavar o canteiro pois estou com preguiça."));
   var impedimento = new Impedimento("Bola de pelos", "Não consigo trabalhar porque tenho bolas de pelo no momento.");
   impedimento.solucionado = true;
   impedimentos.push(impedimento);
   this.usuario.impedimentos = impedimentos;
  }

  iniciarCronometro():void{
    this.cronometro.startTimer()
  }
}
