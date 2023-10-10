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
export class NavbarComponent implements OnInit, OnChanges {
  @Input() usuarioLogado: Usuario;

  isUsuarioLogado: boolean;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.monitorarUsuarioLogado();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.usuarioLogado = this.usuarioLogado;
  }

  private monitorarUsuarioLogado(): void {
    //Monitora a mudanca de rota para atualizar o componente
    this.router.events.subscribe(evento => {
      this.atualizarUsuarioLogado(evento);
    });
  }

  private atualizarUsuarioLogado(evento: any): void {
    if (evento instanceof RouterEvent) {
      if (LocalStorageUtil.isUsuarioLogado()) {
        this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
        this.atualizarStatusUsuarioLogado();
      } else {
        this.atualizarStatusUsuarioLogado();
      }
    }
  }

  private atualizarStatusUsuarioLogado() {
    this.isUsuarioLogado = LocalStorageUtil.isUsuarioLogado();
    this.cd.detectChanges();
  }

  logOut() {
    LocalStorageUtil.removerUsuarioLogado();
    this.direcionarLogin();

  }

  direcionarLogin() {
    this.router.navigate(RotaUtils.rotaLogin());
  }

  direcionarHome() {
    this.router.navigate(RotaUtils.rotaHome());
  }

  direcionarPerfil() {
    this.router.navigate(RotaUtils.rotaPerfil());
  }
}
