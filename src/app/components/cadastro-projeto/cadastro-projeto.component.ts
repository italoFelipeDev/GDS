import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UsuarioService } from 'src/app/service/usuario-service.service';
import { Projeto } from 'src/model/projeto.class';
import { Usuario } from 'src/model/usuario.class';

@Component({
  selector: 'app-cadastro-projeto',
  templateUrl: './cadastro-projeto.component.html',
  styleUrls: ['./cadastro-projeto.component.scss']
})
export class CadastroProjetoComponent implements OnInit{
  
  projetoGroup: FormGroup;

  imagem: string;

  projeto: Projeto;

  idUsuario: string;
  
  ngOnInit(): void {
   this.idUsuario = this.route.snapshot.paramMap.get('id') ? <string> this.route.snapshot.paramMap.get('id') : "";
  }

  constructor(formBuilder:FormBuilder, 
    private route: ActivatedRoute, 
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService){
    this.projetoGroup = formBuilder.group(
      {
        nome: ['',[Validators.required]],
        descricao:['',[Validators.required]],
        icone: [''],
        tempoMedioDeDaily:[15,[Validators.required]],
        tempoMedioDeFala: [2,[Validators.required]],

      }
    )
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;

    const files = target.files as FileList;

    const file = files[0];

    this.saveFile(file);
  }

  saveFile(file: File){
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);

      this.imagem = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  submit(){

    var projeto: Projeto = new Projeto();
  
    projeto.nome = this.projetoGroup.get('nome')?.value;
    projeto.descricao = this.projetoGroup.get('descricao')?.value;
    projeto.tempoMedioDeDaily = this.projetoGroup.get('tempoMedioDeDaily')?.value;
    projeto.tempoMedioDeFala = this.projetoGroup.get('tempoMedioDeFala')?.value;
    projeto.icone = this.imagem;
    projeto.idScrumMaster = this.route.snapshot.paramMap.get('id') ? <string> this.route.snapshot.paramMap.get('id') : "";
 
    this.projetoService.postProjeto(projeto).subscribe(response =>{
      this.projeto = response;
      console.log(response.id.toString())
      this.atualizarUsuario(response.id.toString());
    });
   }

   atualizarUsuario(idProjeto: string){
    this.usuarioService.getUsuario(this.idUsuario).subscribe(response =>{
      var usuario: Usuario = new Usuario();
      usuario = response;
      usuario.listaProjetosId.push(idProjeto);
      this.chamadaDeAtualizacaoUsuario(usuario);
    })
   }

   chamadaDeAtualizacaoUsuario(usuario: Usuario){
    this.usuarioService.putUsuario(usuario).subscribe(response=>{

    });
   }

}
