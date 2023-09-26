import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    formBuilder: FormBuilder, 
    private usuarioService: UsuarioService,
    private router: Router
    ) {
    this.usuarioGroup = formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      icone: ['']
    })
  }
  ngOnInit() {
  }

  submit() {

    var usuario: Usuario = this.mapearFormUsuario();
    this.usuarioService.postUsuario(usuario).subscribe(response => {
      this.direcionarHome(response.id.toString())
     });
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

  direcionarHome(idUsuario: string) {
    this.router.navigate([`${this.ROTA_HOME}/${idUsuario}`])
  }
}
