import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  private readonly ROTA_LOGIN = "/acesso/login";

  private readonly ROTA_HOME = "/home";
  
  ngOnInit(): void {
  }

  constructor(
    private router: Router
    ){

  }

  logOut(){
    if(window.localStorage.getItem("usuarioLogado")){
      window.localStorage.removeItem('usuarioLogado');
      this.direcionarLogin();
    }
    
  }

  direcionarLogin() {
    this.router.navigate([`${this.ROTA_LOGIN}`]);
  }

  direcionarHome() {
    this.router.navigate([`${this.ROTA_HOME}`]);
  }

}
