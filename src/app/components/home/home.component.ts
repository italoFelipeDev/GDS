import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProjetoService } from 'src/app/service/projeto.service';
import { Projeto } from 'src/model/projeto.class';
import { ListaProjetosComponent } from '../lista-projetos/lista-projetos.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  @ViewChild(ListaProjetosComponent) listaProjetosComponent: ListaProjetosComponent;
  listaProjetos: Array<Projeto>;

  constructor(private projetoService: ProjetoService, private cd: ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.projetoService.getProjetos().subscribe(response =>{
      this.listaProjetos = <Array<Projeto>> response;
      this.listaProjetos.sort((a, b) => a.nome.localeCompare(b.nome));
      this.cd.detectChanges();
    })
  }

}
