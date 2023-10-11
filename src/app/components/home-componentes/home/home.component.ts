import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProjetoService } from 'src/app/service/projeto.service';
import { Projeto } from 'src/model/projeto.class';
import { ListaProjetosComponent } from '../lista-projetos/lista-projetos.component';
import { Router } from '@angular/router';
import { Usuario } from 'src/model/usuario.class';
import { RotaUtils } from 'src/utils/rota.class.util';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(ListaProjetosComponent) listaProjetosComponent: ListaProjetosComponent;

  listaProjetos: Array<Projeto> = new Array<Projeto>;

  usuarioLogado: Usuario;

  constructor(
    private projetoService: ProjetoService,
    private cd: ChangeDetectorRef,
    private router: Router) {
  }

  ngOnInit(): void {
    this.carregarUsuarioLogado();
  }

  carregarPaginaHome(): void {
    if (this.usuarioLogado.listaProjetosId) {
      this.usuarioLogado.listaProjetosId.forEach(projetoId => {
        this.projetoService.getProjeto(projetoId).subscribe((response) => {
          this.listaProjetos.push(response);
          this.organizarListaProjetos();
        });
      })
    }
  }

  private organizarListaProjetos(): void {
    this.listaProjetos.sort((a, b) => a.nome.localeCompare(b.nome));
    this.cd.detectChanges();
  }

  carregarUsuarioLogado(): void {
    this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
    this.carregarPaginaHome();
  }

  direcionarCadastroProjeto(): void {
    this.router.navigate(RotaUtils.rotaCadastroProjeto());
  }
}
