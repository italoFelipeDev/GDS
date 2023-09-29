import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {

  usuarioGroup: FormGroup;
  imagem: string;
  private readonly ROTA_HOME = "/home";
  private readonly ROTA_SINGIN = "/acesso/singin";
  private readonly ROTA_LOGIN = "/acesso/login";
  loginToggle: string;

  constructor(
    private cd: ChangeDetectorRef,
    formBuilder: FormBuilder, 
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
    this.usuarioGroup = formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      icone: ['']
    })
  }
  ngOnInit() {
    this.route.paramMap.subscribe(param =>{
      this.loginToggle = param.get('modalidadeLogin') ? <string>  param.get('modalidadeLogin') : ""
    })
    //this.recuperarPath();
  }

  submit() {

    var usuario: Usuario = this.mapearFormUsuario();
    this.usuarioService.postUsuario(usuario).subscribe(response => {
      window.localStorage.setItem("usuarioLogado", JSON.stringify(response));
      this.direcionarHome();
     });
  }

  submitLogin() {
    this.usuarioService.getUsuarios().subscribe(response =>{
      response.forEach(usuario =>{
        if(usuario.email == this.usuarioGroup.get('email')?.value){
          if(usuario.senha == this.usuarioGroup.get('senha')?.value){
            window.localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            this.direcionarHome();
          }
        }
      })
    })
  }

  private mapearFormUsuario() {
    var usuario: Usuario = new Usuario();
    usuario.nome = this.usuarioGroup.get('nome')?.value;
    usuario.email = this.usuarioGroup.get('email')?.value;
    usuario.senha = this.usuarioGroup.get('senha')?.value;
    usuario.icone = this.imagem;
    return usuario;
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;

    const files = target.files as FileList;

    const file = files[0];

    this.saveFile(file);
  }

  saveFile(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imagem = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  direcionarHome() {
    this.router.navigate([`${this.ROTA_HOME}`]);
    this.cd.detectChanges();
  }

  direcionarSingIn() {
    this.router.navigate([`${this.ROTA_SINGIN}`]);
    this.cd.detectChanges();
  }

  direcionarLogin() {
    this.router.navigate([`${this.ROTA_LOGIN}`]);
    this.cd.detectChanges();
  }

  recuperarPath(){
    this.loginToggle = this.route.snapshot.paramMap.get('modalidadeLogin') ? <string>  this.route.snapshot.paramMap.get('modalidadeLogin') : "";
    this.recuperarPath();
    this.cd.detectChanges();
  }
}
