import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { ProjetoService } from 'src/app/service/projeto.service';
import { Falta } from 'src/model/falta.class';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';

@Component({
  selector: 'app-cadastro-falta',
  templateUrl: './cadastro-falta.component.html',
  styleUrls: ['./cadastro-falta.component.scss']
})
export class CadastroFaltaComponent implements OnInit {
  
  @Input() projeto: Projeto;
  
  faltaGroup: FormGroup;

  usuarioLogado: Usuario;

  cadastrarFaltaModal: any;

  constructor(
    formBuilder: FormBuilder,
    private projetoService: ProjetoService,
  ){
    this.montarFaltaGroup(formBuilder);
  }
  
  ngOnInit(): void {
    this.recuperarUsuarioLogado();
  }

  private montarFaltaGroup(formBuilder: FormBuilder) {
    this.faltaGroup = formBuilder.group(
      {
        justificativa: ['', [Validators.required]]
      }
    );
  }

  submit(){
    this.cadastrarFaltaProjeto();
  }

  cadastrarFaltaProjeto(){
    this.projeto.faltasDoDia.push(this.mapearFaltaForm());
    this.projetoService.putProjeto(this.projeto).subscribe(response =>{
      this.projeto = response;
      location.reload();
    });
  }

  mapearFaltaForm(): Falta{
    let falta: Falta = new Falta();
    falta.idProjeto = this.projeto.id.toString();
    falta.idUsuario = this.usuarioLogado.id.toString();
    falta.nomeParticipante = this.usuarioLogado.nome;
    falta.justificativa = this.faltaGroup.get('justificativa')?.value;

    return falta;
  }

  abrirModal(){
    this.cadastrarFaltaModal = new Modal('#cadastrarFaltaModal');
    this.cadastrarFaltaModal.show();
  }

  fecharModal(){
    this.cadastrarFaltaModal.hide();
  }

  recuperarUsuarioLogado() {
    this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
  }

}
