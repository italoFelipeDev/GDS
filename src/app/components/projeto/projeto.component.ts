import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projeto } from 'src/model/projeto.class';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent  implements OnInit{

  @Input() projeto: Projeto;

  private readonly ROTA_PROJETO_VIEW = "projeto"

  private readonly ROTA_PROJETO_DAILY = "display"

  constructor(
    private router: Router
  ){

  }

  ngOnInit(): void {
  }

  direcionarProjetoView(){
    this.router.navigate([`${this.ROTA_PROJETO_VIEW}/${this.projeto.id}`])
  }

  direcionarProjetoDaily(){
    this.router.navigate([`${this.ROTA_PROJETO_DAILY}/${this.projeto.id}`])
  }
}
