import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {

  usuarioGroup: FormGroup;

  scrumMaster: boolean;
 
  constructor(formBuilder:FormBuilder, private usuarioService:UsuarioService){
    this.usuarioGroup = formBuilder.group({
      nome: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      senha: ['',[Validators.required]]
    })
  }
  ngOnInit() {
  }

  submit(){

   var usuario: Usuario = new Usuario(this.usuarioGroup.get('nome')?.value,'',this.usuarioGroup.get('email')?.value,this.usuarioGroup.get('senha')?.value);
   usuario.icone = "../../assets/Pessoa3.jpg";
   this.usuarioService.postUsuario(usuario).subscribe(response =>{});

  }
}
