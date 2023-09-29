import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';

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

  private readonly ROTA_HOME = "/home";

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService
  ) {


    this.projetoGroup = formBuilder.group(
      {
        nome: ['', [Validators.required]],
        descricao: ['', [Validators.required]],
        icone: [''],
        tempoMedioDeDaily: [this.TEMPO_MEDIO_DAILY, [Validators.required]],
        tempoMedioDeFala: [this.TEMPO_MEDIO_FALA, [Validators.required]],

      }
    )
  }

  ngOnInit(): void {
    this.recuperarUsuarioLogado()
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;

    const files = target.files as FileList;

    const file = files[0];

    this.saveFile(file);
  }

  saveFile(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imagem = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  submit() {

    var projeto: Projeto = this.mapearFormProjeto();

    this.projetoService.postProjeto(projeto).subscribe(response => {
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
      window.localStorage.setItem("usuarioLogado", JSON.stringify(response));
      this.recuperarUsuarioLogado();
      location.reload();
    });
  }

  recuperarUsuarioLogado() {
    if (window.localStorage.getItem("usuarioLogado")) {
      let usuarioLogado: string = window.localStorage.getItem("usuarioLogado") ? <string>window.localStorage.getItem("usuarioLogado") : ''
      this.usuarioLogado = JSON.parse(usuarioLogado);
    }
  }

  direcionarHome() {
    this.router.navigate([`${this.ROTA_HOME}`])
  }
}
