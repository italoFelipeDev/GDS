import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projeto } from 'src/model/projeto.class';
import { RotaUtils } from 'src/utils/rota.class.utils';

@Component({
  selector: 'app-lista-projetos',
  templateUrl: './lista-projetos.component.html',
  styleUrls: ['./lista-projetos.component.scss']
})
export class ListaProjetosComponent implements OnInit {
  
  @Input() listaProjetos: Array<Projeto>;

  direcionarCadastroProjeto() {
    this.router.navigate(RotaUtils.rotaCadastroProjeto());
  }

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router
    ) { }
  
  ngOnInit(): void {
    this.organizarListaProjetos();
  }


  private organizarListaProjetos() {
    this.listaProjetos.sort((a, b) => a.nome.localeCompare(b.nome));
    this.cd.detectChanges();
  }
}
