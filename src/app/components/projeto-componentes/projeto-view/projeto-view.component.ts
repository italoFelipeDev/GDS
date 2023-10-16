import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Falta } from 'src/model/falta.class';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';
import { LocalStorageUtil } from 'src/utils/localStorage.class.util';
import { RotaUtils } from 'src/utils/rota.class.util';
import { ToastComponent } from '../../util/toast/toast.component';
import { ToastMensagemUtil } from 'src/utils/toastMensagem.class.util';
import { Anotacao } from 'src/model/anotacao.class';
import { RelatorioMensal } from 'src/model/relatorioMensal.class';

@Component({
  selector: 'app-projeto-view',
  templateUrl: 'projeto-view.component.html',
  styleUrls: ['projeto-view.component.scss']
})
export class ProjetoViewComponent implements OnInit {

  @ViewChild(ToastComponent) toast: ToastComponent;
  projeto: Projeto;
  idProjeto: string;
  usuarioLogado: Usuario;

  private readonly ID_PROJETO_PATH = 'id';

  constructor(
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.carregarUsuarioLogado();
    this.carregarProjeto();
  }


  recuperarIdProjeto(): void {
    if (this.route.snapshot.paramMap.get(this.ID_PROJETO_PATH)) {
      this.idProjeto = this.conversaoIdProjetoPathString();
    }
  }

  private conversaoIdProjetoPathString(): string {
    return this.route.snapshot.paramMap.get(this.ID_PROJETO_PATH) ? <string>this.route.snapshot.paramMap.get(this.ID_PROJETO_PATH) : "";
  }

  carregarProjeto(): void {
    this.recuperarIdProjeto();
    this.projetoService.getProjeto(this.idProjeto).subscribe(response => {
      this.projeto = response;
      this.atualizaRotinaFaltasProjeto();

    })
  }

  atualizaRotinaFaltasProjeto(): void {
    this.atualizarFaltas(this.projeto);
    this.atualizarRotinaRelatorio(this.projeto);
    this.projetoService.putProjeto(this.projeto).subscribe(response => {
      this.projeto = response;
      
    })
  }

  atualizarRotinaRelatorio(projeto: Projeto): void{
    let hoje = new Date();
    if(projeto.relatorioMensalList.length <= 0){
      let relatorioNovo = new RelatorioMensal();
      projeto.relatorioMensalList.push(relatorioNovo);
    }
    projeto.relatorioMensalList.forEach(relatorio =>{
      if(this.converterDataObjeto(relatorio.dataRelatorio).getMonth() < hoje.getMonth() && this.converterDataObjeto(relatorio.dataRelatorio).getMonth() + 1 == hoje.getMonth()){
        let relatorioNovo = new RelatorioMensal();
        projeto.relatorioMensalList.push(relatorioNovo);
      }
    })
  }

  atualizarFaltas(projeto: Projeto): void {
    let hoje = new Date();
    projeto.faltasDoDia.forEach(falta => {
      let diaFalta = this.converterDataFalta(falta)
      if (diaFalta.getDate() < hoje.getDate()) {
        projeto.faltasDoMês.push(falta);
        projeto.faltasDoDia = this.excluirItemListaFalta(projeto.faltasDoDia, falta);
      }
    })
  }
  
  excluirProjeto(): void {
    this.projetoService.deleteProjeto(this.projeto).subscribe(response => {
      this.atualizarUsuariosExclusaoProjeto();
    });
  }

  removerParticipante(usuario: Usuario): void {
    this.limparListasRemocaoUsuario(usuario);
    this.usuarioService.putUsuario(usuario).subscribe(response => {
      LocalStorageUtil.salvarUsuarioLogado(response);
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

  private atualizarUsuariosExclusaoProjeto(): void {
    this.projeto.participantesId.forEach(idParticipante => {
      this.usuarioService.getUsuario(idParticipante).subscribe(responseUser => {
        responseUser.listaProjetosId = this.excluirItemListaPorId(responseUser.listaProjetosId, this.projeto.id.toString());
        this.usuarioService.putUsuario(responseUser).subscribe(response =>{
          if(response.id == this.usuarioLogado.id){
            LocalStorageUtil.salvarUsuarioLogado(response);
            this.carregarUsuarioLogado();
          }
        });
      });
    });
    this.direcionarHome();
  }

  direcionarHome(): void {
    this.router.navigate(RotaUtils.rotaHome())
  }

  direcionarRelatorio(): void {
    this.router.navigate(RotaUtils.rotaRelatorio(this.idProjeto));
  }

  carregarUsuarioLogado(): void {
    this.usuarioLogado = LocalStorageUtil.recuperarUsuarioLogado();
  }

  isUsuarioScrumMaster(): boolean {
    return this.projeto.idScrumMaster == this.usuarioLogado.id.toString();
  }

  isUsuarioDaListaScrumMaster(usuario: Usuario): boolean {
    return this.projeto.idScrumMaster == usuario.id.toString();
  }

  private converterDataFalta(falta: Falta): Date {
    return new Date(falta.diaFalta);
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

  isUsuarioAutorizadoAcesso(): boolean {
    let isAutorizado: boolean = false
    this.projeto.participantesId.forEach(idParticipante => {
      if (idParticipante == this.usuarioLogado.id.toString()) {
        isAutorizado = true;
      }
    });
    return isAutorizado;
  }

  converterDataObjeto(data: any): Date{

    return new Date(data);
  }

}
