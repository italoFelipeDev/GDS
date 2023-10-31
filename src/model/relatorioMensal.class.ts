import { DateUtils } from "src/utils/date.class.util";
import { DailyLog } from "./dailyLog.class";
import { Falta } from "./falta.class";

export class RelatorioMensal{

    dataRelatorio: Date = new Date();
    dailyLogMensal: Array<DailyLog> = new Array<DailyLog>;
    faltasDoMes: Array<Falta> = new Array<Falta>;
    mediaTempoDailyMensal: number;
}