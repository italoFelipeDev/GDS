import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProjetoService } from 'src/app/service/projeto.service';
import { Projeto } from 'src/model/projeto.class';
import { ListaProjetosComponent } from '../lista-projetos/lista-projetos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/model/usuario.class';
import { UsuarioService } from 'src/app/service/usuario-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(ListaProjetosComponent) listaProjetosComponent: ListaProjetosComponent;
  listaProjetos: Array<Projeto> = new Array<Projeto>;
  usuarioLogado: Usuario;
  private readonly ROTA_CADASTRO_PROJETO = "/cadastro/projeto";


  constructor(
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
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
    if(window.localStorage.getItem("usuarioLogado")){
      let usuarioLogado : string = window.localStorage.getItem("usuarioLogado") ? <string> window.localStorage.getItem("usuarioLogado") : ''
      this.usuarioLogado = JSON.parse(usuarioLogado);
      this.carregarPaginaHome();
    }
  }

  direcionarCadastroProjeto() {
    this.router.navigate([`${this.ROTA_CADASTRO_PROJETO}`])
  }
}
