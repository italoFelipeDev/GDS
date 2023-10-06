import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';
import { RotaUtils } from 'src/utils/rota.class.utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges{
  @Input()usuarioLogado: Usuario;

  isUsuarioLogado: boolean;
  
  ngOnInit(): void {
    this.monitorarUsuarioLogado();
  }

  private monitorarUsuarioLogado() {
    this.router.events.subscribe(e => {
      if (e instanceof RouterEvent) {
        console.log(LocalStorageUtil.isUsuarioLogado());

        if (LocalStorageUtil.isUsuarioLogado()) {
          this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
          this.atualizarStatusUsuarioLogado();
        } else {
          this.atualizarStatusUsuarioLogado();
        }
      }
    });
  }

  private atualizarStatusUsuarioLogado() {
    this.isUsuarioLogado = LocalStorageUtil.isUsuarioLogado();
    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.usuarioLogado = this.usuarioLogado;
  }

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
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
