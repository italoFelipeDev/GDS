export class StringUtil {

    static formatarDigitoHorario(digito: number): string {
        return digito < 9 ?  '0' + digito  : digito.toString();
    }

    static formatarHorario(hora: number, minuto: number): string{
        return `${this.formatarDigitoHorario(hora)}:${this.formatarDigitoHorario(minuto)}`
    }
}