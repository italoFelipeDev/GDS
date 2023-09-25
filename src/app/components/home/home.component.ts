import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProjetoService } from 'src/app/service/projeto.service';
import { Projeto } from 'src/model/projeto.class';
import { ListaProjetosComponent } from '../lista-projetos/lista-projetos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/model/usuario.class';
import { UsuarioService } from 'src/app/service/usuario-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  @ViewChild(ListaProjetosComponent) listaProjetosComponent: ListaProjetosComponent;
  listaProjetos: Array<Projeto> = new Array<Projeto>;
  usuario: Usuario;
  idUsuario: string;
  rotaCadastro = "/cadastro/projeto";


  constructor(private projetoService: ProjetoService, 
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router){;
  }

  ngOnInit(): void {
    this.recuparIdUsuario();
    this.carregarUsuario();
    console.log(this.usuario);
  }

  loadHome(){
    if(this.usuario.listaProjetosId){
      this.usuario.listaProjetosId.forEach(projetoId =>{
        this.projetoService.getProjeto(projetoId).subscribe((response) =>{
          this.listaProjetos.push(response);
        });
      })
      this.listaProjetos.sort((a, b) => a.nome.localeCompare(b.nome));
      this.cd.detectChanges();
    }
  }
  
  recuparIdUsuario(){
    if( this.route.snapshot.paramMap.get('id') ? <string> this.route.snapshot.paramMap.get('id') : ""){
      this.idUsuario = this.route.snapshot.paramMap.get('id') ? <string> this.route.snapshot.paramMap.get('id') : "";
    }
  }

  setUsuario(usuario: Usuario){
    this.usuario = usuario
  }

  carregarUsuario(){
    this.usuarioService.getUsuario(this.idUsuario).subscribe((response) =>{
        
      this.usuario =  response;
      this.loadHome();
    })
  }

  direcionarCadastroProjeto(){
    this.router.navigate([`${this.rotaCadastro}/${this.idUsuario}`])
  }
}
