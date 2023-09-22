import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-lista-projetos',
  templateUrl: './lista-projetos.component.html',
  styleUrls: ['./lista-projetos.component.scss']
})
export class ListaProjetosComponent implements OnInit {
  @Input() listaProjetos: Array<Projeto>;

  constructor(private cd: ChangeDetectorRef) { }

  
  ngOnInit(): void {
    this.listaProjetos.sort((a, b) => a.nome.localeCompare(b.nome));
    this.cd.detectChanges();
  }

}
