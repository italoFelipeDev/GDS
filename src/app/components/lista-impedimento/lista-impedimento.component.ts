import { Component, Input, OnInit } from '@angular/core';
import { Collapse } from 'bootstrap';
import { Projeto } from 'src/model/projeto.class';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-impedimento',
  templateUrl: './lista-impedimento.component.html',
  styleUrls: ['./lista-impedimento.component.scss']
})
export class ListaImpedimentoComponent implements OnInit {
  
  @Input() projeto: Projeto;

  itemCollapse: Collapse;

  botaoCollapse: Collapse; 

  ngOnInit(): void {
    
    
  }

  temImpedimento(): boolean{
    return this.projeto.impedimentos.length > 0
  }

  toggleColapse(){
    this.itemCollapse = new Collapse('#collapseImpedimento');
    this.itemCollapse.toggle();
  }
}
