import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-projeto-view',
  templateUrl: './projeto-view.component.html',
  styleUrls: ['./projeto-view.component.scss']
})
export class ProjetoViewComponent implements OnInit{

  addParticipanteGroup: FormGroup;
  projeto: Projeto;
  listaParticipantes: Array<Usuario> = new Array<Usuario>;
  idProjeto:string;

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService
  ){ 
    this.addParticipanteGroup = formBuilder.group(
      {
        email: ['', [Validators.required]],
      }
    )
   }

  ngOnInit(): void {
    this.recuperarIdProjeto();
    this.carregarProjeto();
  }

  recuperarIdProjeto() {
    if (this.route.snapshot.paramMap.get('id') ? <string>this.route.snapshot.paramMap.get('id') : "") {
      this.idProjeto = this.route.snapshot.paramMap.get('id') ? <string>this.route.snapshot.paramMap.get('id') : "";
    }
  }

  carregarProjeto(){
    this.projetoService.getProjeto(this.idProjeto).subscribe(response =>{
      this.projeto = response;
      response.participantesId.forEach(participanteId =>{
        this.usuarioService.getUsuario(participanteId).subscribe(response =>{
          this.listaParticipantes.push(response);
        })
      })
    })
  }

  submit(){
    this.usuarioService.getUsuarios().subscribe(response =>{
      response.forEach(usuario =>{
        if(usuario.email == this.addParticipanteGroup.get('email')?.value && this.addParticipanteGroup.get('email')?.value != null){
          usuario.listaProjetosId.push(this.idProjeto);
          this.usuarioService.putUsuario(usuario).subscribe(response =>{
            this.projeto.participantesId.push(response.id.toString());
            this.projetoService.putProjeto(this.projeto).subscribe(response =>{
            }) 
          });
        }
      })
    })
  }
}
