import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';
import { RotaUtils } from 'src/utils/rota.class.utils';
import { ToastComponent } from '../../util/toast/toast.component';
import { ToastMensagemUtil } from 'src/utils/toastMensagem.class.util';
import { Anotacao } from 'src/model/anotacao.class';

@Component({
  selector: 'app-cadastro-projeto',
  templateUrl: './cadastro-projeto.component.html',
  styleUrls: ['./cadastro-projeto.component.scss']
})
export class CadastroProjetoComponent implements OnInit {

  @ViewChild(ToastComponent) toast: ToastComponent;

  projetoGroup: FormGroup;

  imagem: string;

  projeto: Projeto = new Projeto();

  @Input() projetoEditar: Projeto;

  idUsuarioLogado: string;

  usuarioLogado: Usuario;

  private readonly TEMPO_MEDIO_DAILY = 15;

  private readonly TEMPO_MEDIO_FALA = 2;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService
  ) {
    this.montarProjetoForm(formBuilder);
  }

  ngOnInit(): void {
    this.atualizarUsuarioLogado();
    this.atualizarFormEditarProjeto();
  }

  private atualizarFormEditarProjeto() {
    if (this.isEditar()) {
      this.projeto = this.projetoEditar
      this.projetoGroup.patchValue({
        nome: this.projetoEditar.nome,
        descricao: this.projetoEditar.descricao,
        tempoMedioDeDaily: this.projetoEditar.tempoMedioDeDaily,
        tempoMedioDeFala: this.projetoEditar.tempoMedioDeFala
      });
    }
  }

  private montarProjetoForm(formBuilder: FormBuilder) {
    this.projetoGroup = formBuilder.group(
      {
        nome: [this.projeto.nome, [Validators.required]],
        descricao: [this.projeto.descricao, [Validators.required]],
        icone: [''],
        tempoMedioDeDaily: [this.projeto.tempoMedioDeDaily ? this.projeto.tempoMedioDeDaily : this.TEMPO_MEDIO_DAILY, [Validators.required]],
        tempoMedioDeFala: [this.projeto.tempoMedioDeFala ? this.projeto.tempoMedioDeFala : this.TEMPO_MEDIO_FALA, [Validators.required]],
      }
    );
  }

  atribuirImagem(evento: Event) {
    const target = evento.target as HTMLInputElement;

    const arquivos = target.files as FileList;

    const arquivo = arquivos[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      this.imagem = reader.result as string;
    };
    reader.readAsDataURL(arquivo);
  }

  submit() {
    if(this.projetoGroup.valid){
      this.projetoService.postProjeto(this.mapearFormProjeto()).subscribe(response => {
        this.projeto = response;
        this.atualizarUsuario(response.id.toString());
        this.direcionarHome();
      });
    }else{
      this.toast.mostrarToast(ToastMensagemUtil.ERRO_CADASTRAR_PROJETO_TITULO, ToastMensagemUtil.ERRO_CADASTRAR_PROJETO_DESCRICAO);
    }
  }

  submitEditar(){
    if(this.projetoGroup.valid && this.isAltercaoEditarValida()){
      this.aplicarAlteracaoEditarProjeto();
      this.projetoService.putProjeto(this.projeto).subscribe(response =>{
        this.projeto = response;
        location.reload();
      })
    }else{
      this.toast.mostrarToast(ToastMensagemUtil.ERRO_EDITAR_PROJETO_TITULO, ToastMensagemUtil.ERRO_EDITAR_PROJETO_DESCRICAO);
    }
  }

  private mapearFormProjeto() {
    var projeto: Projeto = new Projeto();

    projeto.nome = this.projetoGroup.get('nome')?.value;
    projeto.descricao = this.projetoGroup.get('descricao')?.value;
    projeto.tempoMedioDeDaily = this.projetoGroup.get('tempoMedioDeDaily')?.value;
    projeto.tempoMedioDeFala = this.projetoGroup.get('tempoMedioDeFala')?.value;
    projeto.icone = this.imagem;
    projeto.idScrumMaster = this.usuarioLogado.id.toString();
    projeto.participantesId.push(this.usuarioLogado.id.toString());
    let anotacaoScrumMaster: Anotacao = new Anotacao();
    anotacaoScrumMaster.idUsuario = this.usuarioLogado.id.toString();
    projeto.anotacoesUsuario.push(anotacaoScrumMaster);
    return projeto;
  }

  atualizarUsuario(idProjeto: string) {
    this.usuarioLogado.listaProjetosId.push(idProjeto);
    this.usuarioService.putUsuario(this.usuarioLogado).subscribe(response => {
      LocalStorageUtil.salvarUsuarioLogado(response);
      this.atualizarUsuarioLogado();
      location.reload();
    });
  }

  atualizarUsuarioLogado() {
    this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
  }

  direcionarHome() {
    this.router.navigate(RotaUtils.rotaHome());
  }

  isEditar(): boolean{
    return this.projetoEditar ? true: false;
  }

  aplicarAlteracaoEditarProjeto(){
    this.projeto.nome = this.projetoGroup.get('nome')?.value;
    this.projeto.descricao = this.projetoGroup.get('descricao')?.value;
    this.projeto.tempoMedioDeDaily = this.projetoGroup.get('tempoMedioDeDaily')?.value;
    this.projeto.tempoMedioDeFala = this.projetoGroup.get('tempoMedioDeFala')?.value;
  }

  isAltercaoEditarValida(): boolean{

    let projetoAtual: Projeto = new Projeto();

    projetoAtual.nome = this.projetoEditar.nome;
    projetoAtual.descricao = this.projetoEditar.descricao;
    projetoAtual.tempoMedioDeDaily = this.projetoEditar.tempoMedioDeDaily;
    projetoAtual.tempoMedioDeFala = this.projetoEditar.tempoMedioDeFala;

    let projetoEditado: Projeto = new Projeto();

    projetoEditado.nome = this.projetoGroup.get('nome')?.value;
    projetoEditado.descricao = this.projetoGroup.get('descricao')?.value;
    projetoEditado.tempoMedioDeDaily = this.projetoGroup.get('tempoMedioDeDaily')?.value;
    projetoEditado.tempoMedioDeFala = this.projetoGroup.get('tempoMedioDeFala')?.value;

    return JSON.stringify(projetoAtual) != JSON.stringify(projetoEditado);
  }
}
