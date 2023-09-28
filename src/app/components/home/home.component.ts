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
  idUsuarioLogado: string;
  private readonly ROTA_CADASTRO = "/cadastro/projeto";


  constructor(
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.recuperarIdUsuarioLogado();
    this.carregarUsuarioLogado();
  }

  carregarPaginaHome() {
    if (this.usuarioLogado.listaProjetosId) {
      this.usuarioLogado.listaProjetosId.forEach(projetoId => {
        this.projetoService.getProjeto(projetoId).subscribe((response) => {
          this.listaProjetos.push(response);
        });
      })
    }
  }

  private organizarListaProjetos() {
    this.listaProjetos.sort((a, b) => a.nome.localeCompare(b.nome));
    this.cd.detectChanges();
  }

  recuperarIdUsuarioLogado() {
    if(window.localStorage.getItem("usuarioLogado")){
      let usuarioLogado : string = window.localStorage.getItem("usuarioLogado") ? <string> window.localStorage.getItem("usuarioLogado") : ''
      let usuarioLogadoObject: Usuario = JSON.parse(usuarioLogado);
      this.idUsuarioLogado = usuarioLogadoObject.id.toString();
    }
  }

  carregarUsuarioLogado() {
    this.usuarioService.getUsuario(this.idUsuarioLogado).subscribe((response) => {
      this.usuarioLogado = response;
      this.carregarPaginaHome();
    })
  }

  direcionarCadastroProjeto() {
    this.router.navigate([`${this.ROTA_CADASTRO}`])
  }
}
