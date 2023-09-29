import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Impedimento } from 'src/model/impedimento.class';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-projeto-view',
  templateUrl: './projeto-view.component.html',
  styleUrls: ['./projeto-view.component.scss']
})
export class ProjetoViewComponent implements OnInit {

  addParticipanteGroup: FormGroup;
  projeto: Projeto;
  listaParticipantes: Array<Usuario> = new Array<Usuario>;
  idProjeto: string;
  impedimentoList: Array<Impedimento> = new Array<Impedimento>;
  impedimentoSolucionadoList: Array<Impedimento> = new Array<Impedimento>;

  private readonly ROTA_HOME = "/home";

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService
  ) {
    this.addParticipanteGroup = formBuilder.group(
      {
        email: ['', [Validators.required]],
      }
    )
  }

  ngOnInit(): void {
    this.recuperarIdProjeto();
    this.carregarProjeto();
  }

  recuperarIdProjeto() {
    if (this.route.snapshot.paramMap.get('id') ? <string>this.route.snapshot.paramMap.get('id') : "") {
      this.idProjeto = this.route.snapshot.paramMap.get('id') ? <string>this.route.snapshot.paramMap.get('id') : "";
    }
  }

  carregarProjeto() {
    this.projetoService.getProjeto(this.idProjeto).subscribe(response => {
      this.projeto = response;
      response.participantesId.forEach(participanteId => {
        this.usuarioService.getUsuario(participanteId).subscribe(responseUser => {
          this.listaParticipantes.push(responseUser);
          this.organizarListaParticipantes(this.listaParticipantes);
          this.projeto.impedimentos.forEach(impedimento => {
            if (impedimento.solucionado) {
              this.impedimentoSolucionadoList.push(impedimento);
            } else {
              this.impedimentoList.push(impedimento);
            }
          })
        })
      })
    })
  }

  submit() {
    this.usuarioService.getUsuarios().subscribe(response => {
      response.forEach(usuario => {
        if (usuario.email == this.addParticipanteGroup.get('email')?.value && this.addParticipanteGroup.get('email')?.value != null) {
          usuario.listaProjetosId.push(this.idProjeto);
          this.usuarioService.putUsuario(usuario).subscribe(response => {
            this.projeto.participantesId.push(response.id.toString());
            this.projetoService.putProjeto(this.projeto).subscribe(response => {
              this.projeto = response;
              location.reload();
            })
          });
        }
      })
    })
  }

  private organizarListaParticipantes(listaParcipantes: Array<Usuario>) {
    listaParcipantes.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  excluirProjeto(){ 
    this.projetoService.deleteProjeto(this.projeto).subscribe(response =>{
      this.projeto.participantesId.forEach(idParticipante =>{
        this.usuarioService.getUsuario(idParticipante).subscribe( responseUser =>{
          responseUser.listaProjetosId = this.excluirIdprojetoUsuario(responseUser.listaProjetosId, this.projeto.id.toString());
          this.usuarioService.putUsuario(responseUser).subscribe();
        })
      })
    });
  }

  excluirIdprojetoUsuario(idProjetoList: Array<string>, id: string){
    return idProjetoList.filter( novaLista =>{
      return novaLista != id;
    });
  }

  direcionarHome() {
    this.router.navigate([`${this.ROTA_HOME}`])
  }
}
