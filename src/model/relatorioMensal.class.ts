import { DailyLog } from "./dailyLog.class";
import { Falta } from "./falta.class";

export class RelatorioMensal{

    dailyLogMensal: Array<DailyLog> = new Array<DailyLog>
    faltasDoMês: Array<Falta> = new Array<Falta>();
    mediaTempoDailyMensal: number;
}