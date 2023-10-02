import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';
import { RotaUtils } from 'src/utils/rota.class.utils';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {

  usuarioGroup: FormGroup;
  imagem: string;
  loginToggle: boolean = false;

  private readonly PATH_MODALIDADE_LOGIN = 'modalidadeLogin';

  constructor(
    formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.usuarioGroup = this.montarFormLogin(formBuilder)
  }

  ngOnInit() {
   }

  private montarFormLogin(formBuilder: FormBuilder): FormGroup<any> {
    return formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      icone: ['']
    });
  }

  submit() {
    var usuario: Usuario = this.mapearFormUsuario();
    this.usuarioService.postUsuario(usuario).subscribe(response => {
      LocalStorageUtil.salvarUsuarioLogado(response);
      this.direcionarHome();
    });
  }

  submitLogin() {
    this.usuarioService.getUsuarios().subscribe(response => {
      response.forEach(usuario => {
        if (usuario.email == this.usuarioGroup.get('email')?.value) {
          if (usuario.senha == this.usuarioGroup.get('senha')?.value) {
            LocalStorageUtil.salvarUsuarioLogado(usuario);
            this.direcionarHome();
          }
        }
      })
    })
  }

  mapearFormUsuario() {
    var usuario: Usuario = new Usuario();
    usuario.nome = this.usuarioGroup.get('nome')?.value;
    usuario.email = this.usuarioGroup.get('email')?.value;
    usuario.senha = this.usuarioGroup.get('senha')?.value;
    usuario.icone = this.imagem;
    return usuario;
  }

  atribuirImagem(evento: Event) {
    const target = evento.target as HTMLInputElement;

    const arquivos = target.files as FileList;

    const arquivo = arquivos[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      this.imagem = reader.result as string;
    };
    reader.readAsDataURL(arquivo);
  }

  direcionarHome() {
    this.router.navigate(RotaUtils.rotaHome());
    this.cd.detectChanges();
  }

  direcionarSingIn() {
    this.loginToggle = true;
    this.cd.detectChanges();
  }

  direcionarLogin() {
    this.loginToggle = false;
    this.cd.detectChanges();
  }


  isSingin(): boolean{
    return this.loginToggle;
  }
}
