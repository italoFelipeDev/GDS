import { Impedimento } from "./impedimento.class";

export class Usuario{
    id: number;
    nome: string;
    ordem: number;
    icone: string;
    impedimentos: Array<Impedimento>
    reportFeito: boolean = false;
    realizandoReport: boolean = false;

    constructor(id: number, nome: string , ordem: number, icone:string) {
        this.id = id;
        this.nome = nome;
        this.ordem = ordem;
        this.icone = icone;
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