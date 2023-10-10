import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';
import { RotaUtils } from 'src/utils/rota.class.utils';
import { ToastMensagemUtil } from 'src/utils/toastMensagem.class.util';
import { ToastComponent } from '../util/toast/toast.component';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {

  @ViewChild(ToastComponent) toast: ToastComponent;

  @Input() perfilToggle: boolean = false;

  usuarioGroup: FormGroup;

  imagem: string;

  singinToggle: boolean = false;

  usuario: Usuario = new Usuario();

  isEditar: boolean = false;

  private readonly ICONE_PADRAO = "../../../assets/icone-padrao-usuario.png";

  constructor(
    formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.usuarioGroup = this.montarFormLogin(formBuilder);
  }

  ngOnInit() {
    this.carregarUsuarioLogado();
  }

  private montarFormLogin(formBuilder: FormBuilder): FormGroup<any> {
    return formBuilder.group({
      nome: [this.usuario.nome, [Validators.required, Validators.maxLength(40)]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      senha: [this.usuario.senha, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      icone: [this.usuario.icone]
    });
  }

  carregarUsuarioLogado(): void {
    if (LocalStorageUtil.recuperarUsuarioLogado()) {
      this.usuario = LocalStorageUtil.recuperarUsuarioLogado();
      this.atualizarDadosUsuarioForm();
    }
  }

  private atualizarDadosUsuarioForm() {
    this.usuarioGroup.patchValue({
      nome: this.usuario.nome,
      email: this.usuario.email,
      senha: this.usuario.senha,
      icone: this.usuario.icone
    });
  }

  submit() {
    if (this.usuarioGroup.valid) {
      var usuario: Usuario = this.mapearFormUsuario();
      
      this.usuarioService.postUsuario(usuario).subscribe(response => {
        LocalStorageUtil.salvarUsuarioLogado(response);
        this.direcionarHome();
      });
    } else {
      this.toast.mostrarToast(ToastMensagemUtil.ERRO_SINGIN_TITULO, ToastMensagemUtil.ERRO_SINGIN_DESCRICAO);
    }
  }

  mapearFormUsuario() {
    var usuario: Usuario = new Usuario();
    usuario.nome = this.usuarioGroup.get('nome')?.value;
    usuario.email = this.usuarioGroup.get('email')?.value;
    usuario.senha = this.usuarioGroup.get('senha')?.value;
    if (!this.imagem) {
      usuario.icone = this.ICONE_PADRAO;
    }else{
      usuario.icone = this.imagem;
    }
    return usuario;
  }

  submitLogin() {
    if (this.isLoginValido()) {
      this.usuarioService.getUsuarios().subscribe(response => {
        response.forEach(usuario => {
          this.compararEmailFormLogin(usuario);
        })
        this.toast.mostrarToast(ToastMensagemUtil.ERRO_LOGIN_TITULO, ToastMensagemUtil.ERRO_LOGIN_DESCRICAO);
      })
    } else {
      this.toast.mostrarToast(ToastMensagemUtil.ERRO_LOGIN_TITULO, ToastMensagemUtil.ERRO_LOGIN_DESCRICAO);
    }
  }

  private isLoginValido() {
    return this.usuarioGroup.get('email')?.valid && this.usuarioGroup.get('senha')?.valid;
  }

  private compararEmailFormLogin(usuario: Usuario) {
    if (usuario.email == this.usuarioGroup.get('email')?.value) {
      if (usuario.senha == this.usuarioGroup.get('senha')?.value) {
        LocalStorageUtil.salvarUsuarioLogado(usuario);
        this.direcionarHome();
      }
    }
  }

  submitEditar() {
    if (this.isFormEditarValido()) {
      this.atualizarUsuarioEditado();
    } else {
      this.toast.mostrarToast(ToastMensagemUtil.ERRO_EDITAR_USUARIO_TITULO, ToastMensagemUtil.ERRO_EDITAR_USUARIO_DESCRICAO);
    }
  }

  submitAlterarIconeUsuario(){
    this.atualizarIconeUsuario();
  }

  private atualizarIconeUsuario() {
    if (this.imagem) {
      this.usuario.icone = this.imagem;
      this.usuarioService.putUsuario(this.usuario).subscribe(response => {
        this.usuario = response;
        LocalStorageUtil.salvarUsuarioLogado(this.usuario);
        location.reload();
      });
    }else{
      this.toast.mostrarToast(ToastMensagemUtil.ERRO_EDITAR_ICONE_USUARIO_TITULO, ToastMensagemUtil.ERRO_EDITAR_ICONE_USUARIO_DESCRICAO);
    }
  }

  private atualizarUsuarioEditado():void {
    this.aplicarAlteracoesEditar();
    this.usuarioService.putUsuario(this.usuario).subscribe(response => {
      this.usuario = response;
      LocalStorageUtil.salvarUsuarioLogado(this.usuario);
      location.reload();
    });
  }

  private isFormEditarValido():boolean {
    return this.usuarioGroup.valid && this.isAlteracoesEditarValida();
  }

  isAlteracoesEditarValida(): boolean {
    let usuarioAtual: Usuario = new Usuario();
    let usarioEditado: Usuario = this.mapearFormUsuarioEditar();

    usuarioAtual.nome = LocalStorageUtil.recuperarUsuarioLogado().nome;
    usuarioAtual.email = LocalStorageUtil.recuperarUsuarioLogado().email;
    usuarioAtual.senha = LocalStorageUtil.recuperarUsuarioLogado().senha;

    usuarioAtual.icone = "";
    usarioEditado.icone = "";

    return JSON.stringify(usuarioAtual) != JSON.stringify(usarioEditado);
  }

  aplicarAlteracoesEditar(): void {
    let usuarioEditado: Usuario = this.mapearFormUsuario();
    this.usuario.nome = usuarioEditado.nome;
    this.usuario.email = usuarioEditado.email;
    this.usuario.senha = usuarioEditado.senha;
  }

  mapearFormUsuarioEditar(): Usuario {
    var usuario: Usuario = new Usuario();
    usuario.nome = this.usuarioGroup.get('nome')?.value;
    usuario.email = this.usuarioGroup.get('email')?.value;
    usuario.senha = this.usuarioGroup.get('senha')?.value;
    return usuario;
  }

  atribuirImagem(evento: Event): void {
    const target = evento.target as HTMLInputElement;

    const arquivos = target.files as FileList;

    const arquivo = arquivos[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      this.imagem = reader.result as string;
      this.usuarioGroup.patchValue({
        icone: this.imagem
      })
    };
    reader.readAsDataURL(arquivo);
  }

  direcionarHome(): void {
    this.router.navigate(RotaUtils.rotaHome());
    this.cd.detectChanges();
  }

  direcionarSingIn(): void {
    this.singinToggle = true;
    this.cd.detectChanges();
  }

  direcionarLogin(): void {
    this.singinToggle = false;
    this.cd.detectChanges();
  }


  isSingin(): boolean {
    return this.singinToggle;
  }

  isPerfil(): boolean {
    return this.perfilToggle;
  }

  isInputDesativado(): string {
    return this.isEditar ? '' : 'readonly'
  }
}
