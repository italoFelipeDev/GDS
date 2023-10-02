import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projeto } from 'src/model/projeto.class';
import { RotaUtils } from 'src/utils/rota.class.utils';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent  implements OnInit{

  @Input() projeto: Projeto;

  constructor(
    private router: Router
  ){

  }

  ngOnInit(): void {
  }

  direcionarProjetoView(){
    this.router.navigate(RotaUtils.rotaProjeto(this.projeto.id.toString()));
  }

  direcionarProjetoDaily(){
    this.router.navigate(RotaUtils.rotaProjetoDaily(this.projeto.id.toString()));
  }
}
