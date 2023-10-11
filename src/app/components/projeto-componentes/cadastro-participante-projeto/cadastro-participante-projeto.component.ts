import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Anotacao } from 'src/model/anotacao.class';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';
import { ToastMensagemUtil } from 'src/utils/toastMensagem.class.util';
import { ToastComponent } from '../../util/toast/toast.component';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-cadastro-participante-projeto',
  templateUrl: './cadastro-participante-projeto.component.html',
  styleUrls: ['./cadastro-participante-projeto.component.scss']
})
export class CadastroParticipanteProjetoComponent implements OnInit {
  
  @ViewChild(ToastComponent) toast: ToastComponent;

  @Input() projeto: Projeto;
  @Input() listaParticipantes: Array<Usuario> = new Array<Usuario>;

  addParticipanteGroup: FormGroup;
  usuarioLogado: Usuario;
  modalCadastroParticipante: any;

  constructor(
    formBuilder: FormBuilder,
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService
  ){
    this.montarCadastroUsuarioProjetoForm(formBuilder);
  }

  ngOnInit(): void {
    this.carregarUsuarioLogado();
  }

  private montarCadastroUsuarioProjetoForm(formBuilder: FormBuilder): void {
    this.addParticipanteGroup = formBuilder.group(
      {
        email: ['', [Validators.required]],
      }
    );
  }
  
  carregarUsuarioLogado(): void {
    this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
  }

  submitAdicionarParticipante(): void {
    if (this.addParticipanteGroup.valid && this.isEmailParticipanteCadastradoValido()) {
      this.inscreverUsuarioProjeto();
    } else {
      this.toast.mostrarToast(ToastMensagemUtil.ERRO_ADICIONAR_PARTICIPANTE_TITULO, ToastMensagemUtil.ERRO_ADICIONAR_PARTICIPANTE_DESCRICAO);
    }
  }

  isEmailParticipanteCadastradoValido(): boolean {
    let valido = true;
    this.listaParticipantes.forEach(participante => {
      if (participante.email == this.addParticipanteGroup.get('email')?.value) {
        valido = false;
      }
    })
    return valido;
  }

  private inscreverUsuarioProjeto(): void {
    this.usuarioService.getUsuarios().subscribe(response => {
      response.forEach(usuario => {
        this.atualizaProjetoUsuario(usuario);
      });
    });
  }

  private atualizaProjetoUsuario(usuario: Usuario): void {
    this.buscarUsuarioCadastrado(usuario);
  }

  private buscarUsuarioCadastrado(usuario: Usuario): void {
    if (this.compararEmailUsuario(usuario)) {
      this.adicionarAnotacaoNovoUsuario(usuario);
      this.atualizaUsuarioListaProjetos(usuario);
    }
  }

  private compararEmailUsuario(usuario: Usuario): boolean {
    return usuario.email == this.addParticipanteGroup.get('email')?.value && this.addParticipanteGroup.get('email')?.value != null;
  }

  private adicionarAnotacaoNovoUsuario(usuario: Usuario): void {
    let anotacaoUsuarioNovo: Anotacao = new Anotacao();
    anotacaoUsuarioNovo.idProjeto = this.projeto.id.toString();
    anotacaoUsuarioNovo.idUsuario = usuario.id.toString();
    this.projeto.anotacoesUsuario.push(anotacaoUsuarioNovo);
  }

  private atualizaUsuarioListaProjetos(usuario: Usuario): void {
    usuario.listaProjetosId.push(this.projeto.id.toString());
    this.usuarioService.putUsuario(usuario).subscribe(response => {
      this.atualizaProjetoListaParticipantes(usuario);
    });
  }

  private atualizaProjetoListaParticipantes(usuario: Usuario): void {
    this.projeto.participantesId.push(usuario.id.toString())
    this.projetoService.putProjeto(this.projeto).subscribe(response => {
      this.projeto = response;
      location.reload();
    });
  }

  isUsuarioScrumMaster(): boolean {
    return this.projeto.idScrumMaster == this.usuarioLogado.id.toString();
  }

  abrirModal(){;
    this.modalCadastroParticipante = new Modal('#adicionarParticipanteModal');
    this.modalCadastroParticipante.show();
  }

  fecharModal(){
    this.modalCadastroParticipante.hide();
  }
}
