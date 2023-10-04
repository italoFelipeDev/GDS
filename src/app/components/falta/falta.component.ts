import { Component, Input, OnInit } from '@angular/core';
import { ProjetoService } from 'src/app/service/projeto.service';
import { Falta } from 'src/model/falta.class';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';

@Component({
  selector: 'app-falta',
  templateUrl: './falta.component.html',
  styleUrls: ['./falta.component.scss']
})
export class FaltaComponent implements OnInit {
  
  usuarioLogado: Usuario;

  @Input() falta: Falta;

  @Input() projeto: Projeto;

  constructor(
    private projetoService: ProjetoService
  ){
  }

  ngOnInit(): void {
    this.recuperarUsuarioLogado();
  }

  recuperarUsuarioLogado() {
    this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
  }

  getDataFalta() {
    const dataFalta: Date = new Date(this.falta.diaFalta)
    return dataFalta.toLocaleDateString();
  }

  removerFaltaProjeto(){
    this.projeto.faltasDoDia = this.excluirItemLista(this.projeto.faltasDoDia, this.falta);
    this.projetoService.putProjeto(this.projeto).subscribe(response =>{
      this.projeto = response;
      location.reload();
    })
  }

  excluirItemLista(itemLista: Array<Falta>, item: Falta): Array<Falta> {
    return itemLista.filter(novaLista => {
      return novaLista != item;
    });
  }

  podeRemoverFalta(): boolean{
    return this.falta.idUsuario == this.usuarioLogado.id.toString();
  }

}
