
export class Usuario{
    id: number;
    nome: string;
    ordem: number;
    icone: string;

    constructor(id: number, nome: string , ordem: number, icone:string) {
        this.id = id;
        this.nome = nome;
        this.ordem = ordem;
        this.icone = icone;
     }
}