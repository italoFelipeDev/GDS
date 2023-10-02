import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';
import { RotaUtils } from 'src/utils/rota.class.utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  usuarioLogado: Usuario;
  ngOnInit(): void {
    this.carregarUsuarioLogado();
  }

  constructor(
    private router: Router
    ){

  }

  logOut(){
    LocalStorageUtil.removerUsuarioLogado();
    this.direcionarLogin();
  }

  direcionarLogin() {
    this.router.navigate(RotaUtils.rotaLogin());
  }

  direcionarHome() {
    this.router.navigate(RotaUtils.rotaHome());
  }

  direcionarPerfil(){
    this.router.navigate(RotaUtils.rotaPerfil());
  }

  carregarUsuarioLogado(){
    this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
  }

}
