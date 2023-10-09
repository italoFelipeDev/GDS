import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Falta } from 'src/model/falta.class';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';
import { RotaUtils } from 'src/utils/rota.class.utils';
import { ToastComponent } from '../toast/toast.component';
import { ToastMensagemUtil } from 'src/utils/toastMensagem.class.util';
import { Anotacao } from 'src/model/anotacao.class';

@Component({
  selector: 'app-projeto-view',
  templateUrl: './projeto-view.component.html',
  styleUrls: ['./projeto-view.component.scss']
})
export class ProjetoViewComponent implements OnInit {

  @ViewChild(ToastComponent) toast: ToastComponent;

  addParticipanteGroup: FormGroup;
  projeto: Projeto;
  listaParticipantes: Array<Usuario> = new Array<Usuario>;
  idProjeto: string;
  usuarioLogado: Usuario;

  myModal = document.getElementById('myModal')
  myInput = document.getElementById('myInput')

  private readonly ID_PROJETO_PATH = 'id';

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService
  ) {
    this.montarCadastroUsuarioProjetoForm(formBuilder);
  }

  ngOnInit(): void {
    this.carregarUsuarioLogado();
    this.carregarProjeto();
  }

  private montarCadastroUsuarioProjetoForm(formBuilder: FormBuilder): void {
    this.addParticipanteGroup = formBuilder.group(
      {
        email: ['', [Validators.required]],
      }
    );
  }

  recuperarIdProjeto(): void {
    if (this.route.snapshot.paramMap.get(this.ID_PROJETO_PATH)) {
      this.idProjeto = this.conversaoIdProjetoPath();
    }
  }
  
  private conversaoIdProjetoPath(): string {
    return this.route.snapshot.paramMap.get(this.ID_PROJETO_PATH) ? <string>this.route.snapshot.paramMap.get(this.ID_PROJETO_PATH) : "";
  }
  
  carregarProjeto(): void {
    this.recuperarIdProjeto();
    this.projetoService.getProjeto(this.idProjeto).subscribe(response => {
      this.projeto = response;
      this. atualizaRotinaFaltasProjeto();
      
    })
  }

  atualizaRotinaFaltasProjeto(){
    this.atualizarFaltas(this.projeto);
    this.projetoService.putProjeto(this.projeto).subscribe(response =>{
      this.carregarParticipantesProjeto(response);
    })
  }

  private carregarParticipantesProjeto(response: Projeto): void {
    response.participantesId.forEach(participanteId => {
      this.usuarioService.getUsuario(participanteId).subscribe(responseUser => {
        this.listaParticipantes.push(responseUser);
        this.organizarListaParticipantes(this.listaParticipantes);
      });
    });
  }

  private organizarListaParticipantes(listaParcipantes: Array<Usuario>): void {
    listaParcipantes.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  submit(): void {
    if(this.addParticipanteGroup.valid && this.isEmailParticipanteCadastradoValido()){
      this.inscreverUsuarioProjeto();
    }else{
      this.toast.mostrarToast(ToastMensagemUtil.ERRO_ADICIONAR_PARTICIPANTE_TITULO, ToastMensagemUtil.ERRO_ADICIONAR_PARTICIPANTE_DESCRICAO);
    }
  }

  private inscreverUsuarioProjeto(): void {
    this.usuarioService.getUsuarios().subscribe(response => {
      response.forEach(usuario => {
        this.atualizaProjetoUsuario(usuario);
      });
    });
  }

  private atualizaProjetoUsuario(usuario: Usuario): void {
    if (this.compararEmailUsuario(usuario)) {
      this.projeto.participantesId.push(usuario.id.toString());
      this.adicionarAnotacaoNovoUsuario(usuario);
      this.atualizaProjetoListaParticipantes(usuario);
    }
  }

  private adicionarAnotacaoNovoUsuario(usuario: Usuario) {
    let anotacaoUsuarioNovo: Anotacao = new Anotacao();
    anotacaoUsuarioNovo.idProjeto = this.projeto.id.toString();
    anotacaoUsuarioNovo.idUsuario = usuario.id.toString();
    this.projeto.anotacoesUsuario.push(anotacaoUsuarioNovo);
  }

  private compararEmailUsuario(usuario: Usuario): boolean {
    return usuario.email == this.addParticipanteGroup.get('email')?.value && this.addParticipanteGroup.get('email')?.value != null;
  }

  private atualizaProjetoListaParticipantes(usuario: Usuario): void {
    this.projetoService.putProjeto(this.projeto).subscribe(response => {
      this.projeto = response;
      this.atualizaUsuarioListaProjetos(usuario);
    });
  }

  private atualizaUsuarioListaProjetos(usuario: Usuario): void {
    usuario.listaProjetosId.push(this.idProjeto);
    this.usuarioService.putUsuario(usuario).subscribe(response => {
      location.reload();
    });
  }

  excluirProjeto(): void {
    this.projetoService.deleteProjeto(this.projeto).subscribe(response => {
      this.atualizarUsuariosExclusaoProjeto();
    });
  }

  private atualizarUsuariosExclusaoProjeto(): void {
    this.projeto.participantesId.forEach(idParticipante => {
      this.usuarioService.getUsuario(idParticipante).subscribe(responseUser => {
        responseUser.listaProjetosId = this.excluirItemListaPorId(responseUser.listaProjetosId, this.projeto.id.toString());
        this.usuarioService.putUsuario(responseUser).subscribe();
      });
    });
  }

  excluirItemListaPorId(itemLista: Array<string>, itemId: string): Array<string> {
    return itemLista.filter(novaLista => {
      return novaLista != itemId;
    });
  }

  excluirItemListaFalta(itemLista: Array<Falta>, item: Falta): Array<Falta> {
    return itemLista.filter(novaLista => {
      return novaLista != item;
    });
  }

  excluirItemListaAnotacaoPorId(itemLista: Array<Anotacao>, idParticipante: string): Array<Anotacao> {
    return itemLista.filter(novaLista => {
      return novaLista.idUsuario != idParticipante;
    });
  }

  excluirItemListaFaltaPorId(itemLista: Array<Falta>, idParticipante: string): Array<Falta> {
    return itemLista.filter(novaLista => {
      return novaLista.idUsuario != idParticipante;
    });
  }
  

  removerParticipante(usuario: Usuario){
    usuario.listaProjetosId = this.excluirItemListaPorId(usuario.listaProjetosId, this.projeto.id.toString());
    this.projeto.participantesId = this.excluirItemListaPorId(this.projeto.participantesId, usuario.id.toString());
    this.limparListasRemocaoUsuario(usuario);
    this.usuarioService.putUsuario(usuario).subscribe(response =>{
      LocalStorageUtil.salvarUsuarioLogado(response);
      this.projetoService.putProjeto(this.projeto).subscribe(response =>{
        location.reload();
      })
    })
  }

  private limparListasRemocaoUsuario(usuario: Usuario) {
    this.projeto.anotacoesUsuario = this.excluirItemListaAnotacaoPorId(this.projeto.anotacoesUsuario, usuario.id.toString());
    this.projeto.faltasDoDia = this.excluirItemListaFaltaPorId(this.projeto.faltasDoDia, usuario.id.toString());
  }

  direcionarHome(): void {
    this.router.navigate([`${RotaUtils.rotaHome()}`])
  }

  carregarUsuarioLogado(): void{
    this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
  }

  isUsuarioScrumMaster(): boolean{
    return this.projeto.idScrumMaster == this.usuarioLogado.id.toString();
  }

  isUsuarioDaListaScrumMaster(usuario: Usuario): boolean{
    return this.projeto.idScrumMaster == usuario.id.toString();
  }

  atualizarFaltas(projeto: Projeto){
    let hoje = new Date();
    projeto.faltasDoDia.forEach(falta =>{
      let diaFalta = new Date(falta.diaFalta)
      if(diaFalta.getDate() < hoje.getDate()){
        projeto.faltasDoMês.push(falta);
        projeto.faltasDoDia = this.excluirItemListaFalta(projeto.faltasDoDia, falta);
      }
    })
  }

  isEmailParticipanteCadastradoValido(): boolean{
    let valido = true;
    this.listaParticipantes.forEach(participante => {
      if(participante.email == this.addParticipanteGroup.get('email')?.value){
        valido = false;
      }
    })
    return valido
  }

  isUsuarioAutorizadoAcesso(): boolean{
    let isAutorizado: boolean = false
    this.projeto.participantesId.forEach(idParticipante =>{
      if(idParticipante == this.usuarioLogado.id.toString()){
        isAutorizado = true;
      }
    });
    return isAutorizado;
  }
}
