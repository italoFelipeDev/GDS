import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Projeto } from 'src/model/projeto.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';
import { CadastroFaltaComponent } from '../../projeto-componentes/cadastro-falta/cadastro-falta.component';

@Component({
  selector: 'app-lista-falta',
  templateUrl: './lista-falta.component.html',
  styleUrls: ['./lista-falta.component.scss']
})
export class ListaFaltaComponent implements OnInit {

  @Input() projeto: Projeto;

  @Input() isDailyDisplay: boolean = false;

  @ViewChild(CadastroFaltaComponent) cadastroFaltaComponent: CadastroFaltaComponent;

  registroFaltaValido: boolean = true;
  
  constructor(){

  }

  ngOnInit(): void {
    this.isRegistroFaltaValido();
  }

  temFalta():boolean{
    return this.projeto.faltasDoDia.length > 0;
  }

  isRegistroFaltaValido(){
    let registroFaltaValido = true;
    this.projeto.faltasDoDia.forEach(falta =>{
      if(LocalStorageUtil.recuperarUsuarioLogado().id.toString() == falta.idUsuario){
        registroFaltaValido = false;
      }
    })
    this.registroFaltaValido = registroFaltaValido;
  }

  cadastrarFalta(){
    this.cadastroFaltaComponent.submit();
  }
}
