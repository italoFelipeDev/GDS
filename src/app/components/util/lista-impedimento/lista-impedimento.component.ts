import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Collapse } from 'bootstrap';
import { Projeto } from 'src/model/projeto.class';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastrarImpedimentoComponent } from '../../projeto-componentes/cadastrar-impedimento/cadastrar-impedimento.component';
import { Impedimento } from 'src/model/impedimento.class';

@Component({
  selector: 'app-lista-impedimento',
  templateUrl: './lista-impedimento.component.html',
  styleUrls: ['./lista-impedimento.component.scss']
})
export class ListaImpedimentoComponent implements OnInit {
  
  @Input() projeto: Projeto;

  @ViewChild(CadastrarImpedimentoComponent) cadastrarImpedimentoComponent: CadastrarImpedimentoComponent;

  itemCollapse: Collapse;

  botaoCollapse: Collapse; 

  listaImpedimento: Array<Impedimento>;

  ngOnInit(): void {
    this.organizarListaImpedimento();
  }

  temImpedimento(): boolean{
    return this.projeto.impedimentos.length > 0
  }

  toggleColapse(){
    this.itemCollapse = new Collapse('#collapseImpedimento');
    this.itemCollapse.toggle();
  }

  cadastrarImpedimento(){
    this.cadastrarImpedimentoComponent.submit();
  }

  organizarListaImpedimento(){
    this.listaImpedimento = this.projeto.impedimentos;

    this.listaImpedimento.sort((a,b) => (a.dataInicio > b.dataInicio) ? 1 : (b.dataInicio > a.dataInicio) ? -1 : 0);
  }
}
