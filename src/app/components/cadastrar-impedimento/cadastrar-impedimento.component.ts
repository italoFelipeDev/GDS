import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Impedimento } from 'src/model/impedimento.class';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-cadastrar-impedimento',
  templateUrl: './cadastrar-impedimento.component.html',
  styleUrls: ['./cadastrar-impedimento.component.scss']
})
export class CadastrarImpedimentoComponent implements OnInit {

  impedimentoGroup: FormGroup;

  UsuarioLogado: Usuario;
  
  idProjeto: string;

  @Input() projeto: Projeto;

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService
    ){
      this.impedimentoGroup = formBuilder.group(
        {
          titulo: ['', [Validators.required]],
          descricao: ['', [Validators.required]]  
        }
      )

  }
  
  ngOnInit(): void {
    this.recuperarUsuarioLogado();
  }

  submit(){
    let impedimento: Impedimento = new Impedimento(this.impedimentoGroup.get('titulo')?.value, this.impedimentoGroup.get('descricao')?.value );
    impedimento.idParticipante = this.UsuarioLogado.id;
    impedimento.idProjeto = this.projeto.id.toString();
    impedimento.nomeUsuario = this.UsuarioLogado.nome;
    this.projeto.impedimentos.push(impedimento);
    this.projetoService.putProjeto(this.projeto).subscribe( response =>{
      this.projeto = response;
      location.reload();
    })
  }

  recuperarUsuarioLogado() {
    if(window.localStorage.getItem("usuarioLogado")){
      let usuarioLogado : string = window.localStorage.getItem("usuarioLogado") ? <string> window.localStorage.getItem("usuarioLogado") : ''
      this.UsuarioLogado = JSON.parse(usuarioLogado); 
    }
  }
}
