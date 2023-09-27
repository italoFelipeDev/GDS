import { Impedimento } from "./impedimento.class";

export class DailyLog {

    id: number;
    idProjeto: string;
    data: Date;
    impedimentosDoDiaList: Array<Impedimento>;
    tempoDecorrido: number;
}