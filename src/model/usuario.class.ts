import { Impedimento } from "./impedimento.class";

export class Usuario{
    id: number;
    nome: string;
    email: string;
    senha: string;
    icone: any;
    ordem: number;
    scrumMaster: boolean;
    impedimentos: Array<Impedimento>
    reportFeito: boolean = false;
    realizandoReport: boolean = false;
    listaProjetosId: Array<string>;

    //constructor(nome: string, icone: string, email: string, senha: string) {
        //this.nome = nome;
       // this.icone = icone;
        //this.email = email;
        //this. senha = senha;
     //}

     constructor(){

     }

     addImpedimento(impedimento: Impedimento) : Array<Impedimento>{
        this.impedimentos.push(impedimento);
        return this.impedimentos;
     }

     removerImpedimento(impedimentoId: number){
        var posicao = undefined;
        this.impedimentos.forEach((impedimento) => {
            if(impedimento.id == impedimentoId){
                posicao = this.impedimentos.indexOf(impedimento);
            }
        })
        if(posicao != undefined){
            this.impedimentos.splice(posicao,1);
        }
     }
}