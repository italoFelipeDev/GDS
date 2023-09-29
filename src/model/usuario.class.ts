import { Impedimento } from "./impedimento.class";

export class Usuario{
    id: number;
    nome: string;
    email: string;
    senha: string;
    icone: any;
    ordem: number;
    scrumMaster: boolean;
    reportFeito: boolean = false;
    realizandoReport: boolean = false;
    listaProjetosId: Array<string> = new Array<string>;

    //constructor(nome: string, icone: string, email: string, senha: string) {
        //this.nome = nome;
       // this.icone = icone;
        //this.email = email;
        //this. senha = senha;
     //}

     constructor(){

     }
}