import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetoService } from 'src/app/service/projeto.service';
import { Anotacao } from 'src/model/anotacao.class';
import { Projeto } from 'src/model/projeto.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';

@Component({
  selector: 'app-anotacao',
  templateUrl: './anotacao.component.html',
  styleUrls: ['./anotacao.component.scss']
})
export class AnotacaoComponent implements OnInit {
  
  @Input() projeto: Projeto;
  
  @Input() isDailyDisplay: boolean = false;

  anotacaoGroup: FormGroup;

  anotacaoUsuario: Anotacao = new Anotacao();

  constructor(
    private projetoService: ProjetoService,
    formBuilder: FormBuilder,
  ) {
    this.anotacaoGroup = this.montarFormAnotacao(formBuilder);
  }

  ngOnInit(): void {
    this.recuperarAnotacaoUsuario();
  }

  private montarFormAnotacao(formBuilder: FormBuilder): FormGroup<any> {
    return formBuilder.group({
      textoAnotacao: [this.anotacaoUsuario.textoAnotacao]
    });
  }

  recuperarAnotacaoUsuario(): void {
    this.projeto.anotacoesUsuario.forEach(anotacao => {
      if (anotacao.idUsuario == LocalStorageUtil.recuperarUsuarioLogado().id.toString()) {
        this.anotacaoUsuario = anotacao;
        this.anotacaoGroup.patchValue({
          textoAnotacao: anotacao.textoAnotacao
        })
      }
    })
  }

  submit(): void {
    this.anotacaoUsuario.textoAnotacao = this.anotacaoGroup.get('textoAnotacao')?.value;
    this.projeto.anotacoesUsuario.forEach(anotacao => {
      if (anotacao.idUsuario == this.anotacaoUsuario.idUsuario) {
        anotacao.textoAnotacao = this.anotacaoUsuario.textoAnotacao;
        this.projetoService.putProjeto(this.projeto).subscribe(response => {
          this.projeto = response;
        })
      }
    })
  }
}
