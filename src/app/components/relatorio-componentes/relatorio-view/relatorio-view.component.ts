import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';

@Component({
  selector: 'app-relatorio-view',
  templateUrl: './relatorio-view.component.html',
  styleUrls: ['./relatorio-view.component.scss']
})
export class RelatorioViewComponent implements OnInit {
  
  usuarioLogado: Usuario;
  idProjeto: string;
  projeto: Projeto;
  listaParticipantes: Array<Usuario> = new Array<Usuario>;

  ID_PROJETO_PATH = 'id';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService
  ){}

  ngOnInit(): void {
    this.carregarUsuarioLogado();
    this.carregarProjeto();
  }

  carregarUsuarioLogado(): void{
    this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
  }

  recuperarIdProjeto(): void {
    if (this.route.snapshot.paramMap.get(this.ID_PROJETO_PATH)) {
      this.idProjeto = this.conversaoIdProjetoPath();
    }
  }

  private conversaoIdProjetoPath(): string {
    return this.route.snapshot.paramMap.get(this.ID_PROJETO_PATH) ? <string>this.route.snapshot.paramMap.get(this.ID_PROJETO_PATH) : "";
  }

  carregarProjeto(): void {
    this.recuperarIdProjeto();
    this.projetoService.getProjeto(this.idProjeto).subscribe(response => {
      this.projeto = response;
      this.carregarParticipantesProjeto(response);
    })
  }

  private carregarParticipantesProjeto(response: Projeto): void {
    response.participantesId.forEach(participanteId => {
      this.usuarioService.getUsuario(participanteId).subscribe(responseUser => {
        this.listaParticipantes.push(responseUser);
        this.organizarListaParticipantes(this.listaParticipantes);
      });
    });
  }

  private organizarListaParticipantes(listaParcipantes: Array<Usuario>): void {
    listaParcipantes.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  isUsuarioAutorizadoAcesso(): boolean{
    let isAutorizado: boolean = false
    this.projeto.participantesId.forEach(idParticipante =>{
      if(idParticipante == this.usuarioLogado.id.toString()){
        isAutorizado = true;
      }
    });
    return isAutorizado;
  }
}
