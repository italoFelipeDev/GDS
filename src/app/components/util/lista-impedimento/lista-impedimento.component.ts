import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Collapse } from 'bootstrap';
import { Projeto } from 'src/model/projeto.class';
import { CadastrarImpedimentoComponent } from '../../projeto-componentes/cadastrar-impedimento/cadastrar-impedimento.component';
import { Impedimento } from 'src/model/impedimento.class';
import { DateUtils } from 'src/utils/date.class.util';
import { RelatorioMensal } from 'src/model/relatorioMensal.class';

@Component({
  selector: 'app-lista-impedimento',
  templateUrl: './lista-impedimento.component.html',
  styleUrls: ['./lista-impedimento.component.scss']
})
export class ListaImpedimentoComponent implements OnInit {

  @Input() projeto: Projeto;

  @ViewChild(CadastrarImpedimentoComponent) cadastrarImpedimentoComponent: CadastrarImpedimentoComponent;

  listaImpedimento: Array<Impedimento>;

  @Input() relatorioMensal: RelatorioMensal;

  listaImpedimentoRelatorio: Array<Impedimento> = new Array<Impedimento>();

  constructor(
    private cd: ChangeDetectorRef
    ){}

  ngOnInit(): void {
    this.organizarListaImpedimento();
  }

  temImpedimento(): boolean {
    return this.projeto.impedimentos.length > 0
  }

  temImpedimentoNoMes(): boolean {
    return this.listaImpedimentoRelatorio.length > 0
  }

  cadastrarImpedimento(): void {
    this.cadastrarImpedimentoComponent.submit();
  }

  organizarListaImpedimento(): void {
    this.listaImpedimento = this.projeto.impedimentos;

    this.getImpedimentoMensal();
    
    //Organizar por data
    this.listaImpedimento.sort((a, b) => (a.dataInicio > b.dataInicio) ? 1 : (b.dataInicio > a.dataInicio) ? -1 : 0);
  }

  abrirModalCadastrarImpedimento(): void {
    this.cadastrarImpedimentoComponent.abrirModal();
  }

  collapse(index: number): void{
    let collapse = new Collapse('#collapseImpedimento' + index );
    collapse.hide();
  }

  getImpedimentoMensal(){
    this.listaImpedimentoRelatorio = new Array<Impedimento>();

    this.projeto.impedimentos.forEach(impedimento =>{

      if(DateUtils.converterDataObjeto(impedimento.dataInicio).getMonth() == DateUtils.converterDataObjeto(this.relatorioMensal.dataRelatorio).getMonth() 
      || DateUtils.converterDataObjeto(impedimento.dataFim).getMonth() == DateUtils.converterDataObjeto(this.relatorioMensal.dataRelatorio).getMonth()){
        this.listaImpedimentoRelatorio.push(impedimento);
      }
    })
    this.cd.detectChanges();
  }
}
