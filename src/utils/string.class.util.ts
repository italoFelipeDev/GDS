import { DateUtils } from "./date.class.util";

export class StringUtil {

    static formatarDigitoHorario(digito: number): string {
        return digito < 9 ?  '0' + digito  : digito.toString();
    }

    static formatarHorario(hora: number, minuto: number): string{
        return `${this.formatarDigitoHorario(hora)}:${this.formatarDigitoHorario(minuto)}`;
    }

    static timeConvert(tempo: number) {
        return `${this.formatarDigitoHorario(DateUtils.converterTempoHoras(tempo))}:${this.formatarDigitoHorario(DateUtils.converterTempoMinutos(tempo))}:${this.formatarDigitoHorario(DateUtils.converterTempoSegundoDisplay(tempo))}`;
    }
}