import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';
import { RotaUtils } from 'src/utils/rota.class.utils';

@Component({
  selector: 'app-cadastro-projeto',
  templateUrl: './cadastro-projeto.component.html',
  styleUrls: ['./cadastro-projeto.component.scss']
})
export class CadastroProjetoComponent implements OnInit {

  projetoGroup: FormGroup;

  imagem: string;

  projeto: Projeto;

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
  }

  private montarProjetoForm(formBuilder: FormBuilder) {
    this.projetoGroup = formBuilder.group(
      {
        nome: ['', [Validators.required]],
        descricao: ['', [Validators.required]],
        icone: [''],
        tempoMedioDeDaily: [this.TEMPO_MEDIO_DAILY, [Validators.required]],
        tempoMedioDeFala: [this.TEMPO_MEDIO_FALA, [Validators.required]],
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

    this.projetoService.postProjeto(this.mapearFormProjeto()).subscribe(response => {
      this.projeto = response;
      this.atualizarUsuario(response.id.toString());
      this.direcionarHome();
    });
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
}
