import { Impedimento } from "./impedimento.class";
import { Usuario } from "./usuario.class";

export class Projeto{
    id: number;
    idScrumMaster: number;
    nome: string;
    descricao: string;
    icone: string;
    impedimentos: Array<Impedimento>;
    logReunioes: any;
    participantesId: Array<number>;
    participantes: Array<Usuario>;

}
