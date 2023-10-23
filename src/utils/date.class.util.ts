export class DateUtils{

    static converterDataObjeto(data: any): Date{
        return new Date(data);
    }

    static converterTempoSegundo(tempo: number){
        return Math.floor(tempo/1000);
    }

    static converterTempoSegundoDisplay(tempo: number){
        return Math.floor((tempo/1000) % 60);
    }

    static converterTempoMinutos(tempo: number){
        return Math.floor((tempo/1000) / 60);
    }

    static converterTempoHoras(tempo: number){
        return Math.floor(((tempo/1000) / 60) / 60);
    }
}