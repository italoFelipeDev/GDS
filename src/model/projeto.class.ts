import { Anotacao } from "./anotacao.class";
import { DailyLog } from "./dailyLog.class";
import { Falta } from "./falta.class";
import { Impedimento } from "./impedimento.class";
import { RelatorioMensal } from "./relatorioMensal.class";
import { Usuario } from "./usuario.class";

export class Projeto{
    id: number;
    idScrumMaster: string;
    nome: string;
    descricao: string;
    horarioReuniaoHoras: number;
    horarioReuniaoMinutos: number;
    icone: string;
    impedimentos: Array<Impedimento> = new Array<Impedimento>;
    logReunioes: Array<DailyLog> = new Array<DailyLog>;
    participantesId: Array<string> = new Array<string>;
    participantes: Array<Usuario>;
    tempoMedioDeDaily: number;
    tempoMedioDeFala: number;
    anotacoesUsuario: Array<Anotacao> = new Array<Anotacao>;
    faltasDoDia: Array<Falta> = new Array<Falta>();
    faltasDoMês: Array<Falta> = new Array<Falta>();
    relatorioMensalList: Array<RelatorioMensal> = new Array<RelatorioMensal>();
}
