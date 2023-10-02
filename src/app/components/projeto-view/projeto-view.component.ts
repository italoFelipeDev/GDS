import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Impedimento } from 'src/model/impedimento.class';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';
import { RotaUtils } from 'src/utils/rota.class.utils';

@Component({
  selector: 'app-projeto-view',
  templateUrl: './projeto-view.component.html',
  styleUrls: ['./projeto-view.component.scss']
})
export class ProjetoViewComponent implements OnInit {

  addParticipanteGroup: FormGroup;
  projeto: Projeto;
  listaParticipantes: Array<Usuario> = new Array<Usuario>;
  idProjeto: string;

  private readonly ID_PROJETO_PATH = 'id';

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService
  ) {
    this.montarCadastroUsuarioProjetoForm(formBuilder);
  }

  ngOnInit(): void {
    this.carregarProjeto();
  }

  private montarCadastroUsuarioProjetoForm(formBuilder: FormBuilder): void {
    this.addParticipanteGroup = formBuilder.group(
      {
        email: ['', [Validators.required]],
      }
    );
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

  submit(): void {
    this.inscreverUsuarioProjeto();
  }

  private inscreverUsuarioProjeto(): void {
    this.usuarioService.getUsuarios().subscribe(response => {
      response.forEach(usuario => {
        this.atualizaProjetoUsuario(usuario);
      });
    });
  }

  private atualizaProjetoUsuario(usuario: Usuario): void {
    if (this.compararEmailUsuario(usuario)) {
      this.projeto.participantesId.push(usuario.id.toString());
      this.atualizaProjetoListaParticipantes(usuario);
    }
  }

  private compararEmailUsuario(usuario: Usuario): boolean {
    return usuario.email == this.addParticipanteGroup.get('email')?.value && this.addParticipanteGroup.get('email')?.value != null;
  }

  private atualizaProjetoListaParticipantes(usuario: Usuario): void {
    this.projetoService.putProjeto(this.projeto).subscribe(response => {
      this.projeto = response;
      this.atualizaUsuarioListaProjetos(usuario);
    });
  }

  private atualizaUsuarioListaProjetos(usuario: Usuario): void {
    usuario.listaProjetosId.push(this.idProjeto);
    this.usuarioService.putUsuario(usuario).subscribe(response => {
      location.reload();
    });
  }

  excluirProjeto(): void {
    this.projetoService.deleteProjeto(this.projeto).subscribe(response => {
      this.atualizarUsuariosExclusaoProjeto();
    });
  }

  private atualizarUsuariosExclusaoProjeto(): void {
    this.projeto.participantesId.forEach(idParticipante => {
      this.usuarioService.getUsuario(idParticipante).subscribe(responseUser => {
        responseUser.listaProjetosId = this.excluirIdprojetoUsuario(responseUser.listaProjetosId, this.projeto.id.toString());
        this.usuarioService.putUsuario(responseUser).subscribe();
      });
    });
  }

  excluirIdprojetoUsuario(idProjetoList: Array<string>, idProjetoExcluido: string): Array<string> {
    return idProjetoList.filter(novaLista => {
      return novaLista != idProjetoExcluido;
    });
  }

  direcionarHome(): void {
    this.router.navigate([`${RotaUtils.rotaHome()}`])
  }
}
