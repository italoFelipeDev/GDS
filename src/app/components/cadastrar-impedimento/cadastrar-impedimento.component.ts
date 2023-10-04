import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetoService } from 'src/app/service/projeto.service';
import { Impedimento } from 'src/model/impedimento.class';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';

@Component({
  selector: 'app-cadastrar-impedimento',
  templateUrl: './cadastrar-impedimento.component.html',
  styleUrls: ['./cadastrar-impedimento.component.scss']
})
export class CadastrarImpedimentoComponent implements OnInit {

  impedimentoGroup: FormGroup;

  usuarioLogado: Usuario;

  idProjeto: string;

  @Input() projeto: Projeto;

  constructor(
    formBuilder: FormBuilder,
    private projetoService: ProjetoService,
  ) {
    this.montarImpedimentoForm(formBuilder);
  }

  ngOnInit(): void {
    this.recuperarUsuarioLogado();
  }

  private montarImpedimentoForm(formBuilder: FormBuilder) {
    this.impedimentoGroup = formBuilder.group(
      {
        titulo: ['', [Validators.required]],
        descricao: ['', [Validators.required]]
      }
    );
  }

  submit() {
    this.cadastrarImpedimento();
  }

  private cadastrarImpedimento() {
    this.projeto.impedimentos.push(this.mapearImpedimentoForm());
    this.projetoService.putProjeto(this.projeto).subscribe(response => {
      this.projeto = response;
      location.reload();
    });
  }

  private mapearImpedimentoForm() {
    let impedimento: Impedimento = new Impedimento();
    impedimento.titulo = this.impedimentoGroup.get('titulo')?.value;
    impedimento.descricao = this.impedimentoGroup.get('descricao')?.value;
    impedimento.idParticipante = this.usuarioLogado.id;
    impedimento.idProjeto = this.projeto.id.toString();
    impedimento.nomeUsuario = this.usuarioLogado.nome;
    return impedimento;
  }

  recuperarUsuarioLogado() {
      this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
  }
}
