export class Usuario{
    id: number;
    nome: string;
    email: string;
    senha: string;
    icone: any;
    ordem: number;
    scrumMaster: boolean;
    listaProjetosId: Array<string> = new Array<string>;

     constructor(){
     }
}