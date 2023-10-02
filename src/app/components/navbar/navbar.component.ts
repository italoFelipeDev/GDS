import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';
import { RotaUtils } from 'src/utils/rota.class.utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  private readonly ROTA_LOGIN = "/acesso/login";
  
  ngOnInit(): void {
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

  perfil(){
    LocalStorageUtil.recuperarUsuarioLogado();
  }

}
