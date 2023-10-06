import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProjetoService } from 'src/app/service/projeto.service';
import { Projeto } from 'src/model/projeto.class';
import { ListaProjetosComponent } from '../lista-projetos/lista-projetos.component';
import { Router } from '@angular/router';
import { Usuario } from 'src/model/usuario.class';
import { RotaUtils } from 'src/utils/rota.class.utils';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';
import { Toast } from 'bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(ListaProjetosComponent) listaProjetosComponent: ListaProjetosComponent;

  listaProjetos: Array<Projeto> = new Array<Projeto>;
  usuarioLogado: Usuario;

  toastLiveExample = document.getElementById('liveToast')

  toastTrigger = document.getElementById('liveToastBtn')

  toast: any;

  constructor(
    private projetoService: ProjetoService,
    private cd: ChangeDetectorRef,
    private router: Router) {
  }

  ngOnInit(): void {
    this.carregarUsuarioLogado();
  }

  carregarPaginaHome() {
    if (this.usuarioLogado.listaProjetosId) {
      this.usuarioLogado.listaProjetosId.forEach(projetoId => {
        this.projetoService.getProjeto(projetoId).subscribe((response) => {
          this.listaProjetos.push(response);
          this.organizarListaProjetos();
        });
      })
    }
  }

  private organizarListaProjetos() {
    this.listaProjetos.sort((a, b) => a.nome.localeCompare(b.nome));
    this.cd.detectChanges();
  }

  carregarUsuarioLogado() {
    this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
    this.carregarPaginaHome();
  }

  direcionarCadastroProjeto() {
    this.router.navigate(RotaUtils.rotaCadastroProjeto());
  }
}
