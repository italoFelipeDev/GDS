import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Anotacao } from 'src/model/anotacao.class';
import { Falta } from 'src/model/falta.class';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';
import { ToastMensagemUtil } from 'src/utils/toastMensagem.class.util';
import { ToastComponent } from '../../util/toast/toast.component';
import { CadastroParticipanteProjetoComponent } from '../cadastro-participante-projeto/cadastro-participante-projeto.component';

@Component({
  selector: 'app-lista-participante-projeto',
  templateUrl: './lista-participante-projeto.component.html',
  styleUrls: ['./lista-participante-projeto.component.scss']
})
export class ListaParticipanteProjetoComponent implements OnInit {

  @Input() projeto: Projeto;
  @ViewChild(CadastroParticipanteProjetoComponent) cadastrarImpedimentoComponent: CadastroParticipanteProjetoComponent;
  listaParticipantes: Array<Usuario> = new Array<Usuario>;

  addParticipanteGroup: FormGroup;
  idProjeto: string;
  usuarioLogado: Usuario;
 
  
  constructor(
    private cd: ChangeDetectorRef, 
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService,
  ){
    
  }

  ngOnInit(): void {
    this.carregarUsuarioLogado();
    this.carregarParticipantesProjeto();
  }

  carregarUsuarioLogado(): void {
    this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
  }

  private carregarParticipantesProjeto(): void {
    this.projeto.participantesId.forEach(participanteId => {
      this.usuarioService.getUsuario(participanteId).subscribe(responseUser => {
        this.listaParticipantes.push(responseUser);
        this.organizarListaParticipantes(this.listaParticipantes);
      });
    });
  }

  private organizarListaParticipantes(listaParcipantes: Array<Usuario>): void {
    listaParcipantes.sort((a, b) => a.nome.localeCompare(b.nome));
  }


  removerParticipante(usuario: Usuario): void {
    this.limparListasRemocaoUsuario(usuario);
    this.usuarioService.putUsuario(usuario).subscribe(response => {
      this.projetoService.putProjeto(this.projeto).subscribe(response => {
        location.reload();
      })
    })
  }

  private limparListasRemocaoUsuario(usuario: Usuario): void {
    usuario.listaProjetosId = this.excluirItemListaPorId(usuario.listaProjetosId, this.projeto.id.toString());
    this.projeto.participantesId = this.excluirItemListaPorId(this.projeto.participantesId, usuario.id.toString());
    this.projeto.anotacoesUsuario = this.excluirItemListaAnotacaoPorId(this.projeto.anotacoesUsuario, usuario.id.toString());
    this.projeto.faltasDoDia = this.excluirItemListaFaltaPorId(this.projeto.faltasDoDia, usuario.id.toString());
  }

  abrirModalCadastroParticipante(): void{
    this.cd.detectChanges();
    this.cadastrarImpedimentoComponent.abrirModal()
  }

  isUsuarioScrumMaster(): boolean {
    return this.projeto.idScrumMaster == this.usuarioLogado.id.toString();
  }

  isUsuarioDaListaScrumMaster(usuario: Usuario): boolean {
    return this.projeto.idScrumMaster == usuario.id.toString();
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

}
