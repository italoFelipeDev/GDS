import { Falta } from "./falta.class";
import { Impedimento } from "./impedimento.class";
import { ReportUsuarioLog } from "./reportUsuarioLog.class";

export class DailyLog {

    id: number;
    idProjeto: string;
    data: Date;
    impedimentosDoDiaList: Array<Impedimento> = new Array<Impedimento>;
    tempoDecorrido: number;
    tempoDecorridoReports: Array<ReportUsuarioLog> = new Array<ReportUsuarioLog>
    notaDaily: number;
    tempoMedioReports: number;
    faltas: Array<Falta> = new Array<Falta>;

    constructor(){
        this.data = new Date();
    }
}