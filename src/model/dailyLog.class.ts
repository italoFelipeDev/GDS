import { Impedimento } from "./impedimento.class";
import { ReportUsuarioLog } from "./reportUsuarioLog.class";
import { Usuario } from "./usuario.class";

export class DailyLog {

    id: number;
    idProjeto: string;
    data: Date;
    impedimentosDoDiaList: Array<Impedimento> = new Array<Impedimento>;
    tempoDecorrido: number;
    tempoDecorridoReports: Array<ReportUsuarioLog> = new Array<ReportUsuarioLog>
    notaDaily: number;

    constructor(){
        this.data = new Date();
    }
}