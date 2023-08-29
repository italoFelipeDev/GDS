export class Impedimento{

    id: number;
    idParticipante: number;
    idProjeto: number;
    titulo: string;
    descricao: string;
    solucionado: boolean;
    dataInicio: Date;
    dataFim: Date;

    constructor(titulo: string, descricao: string){
        this.titulo = titulo;
        this.descricao = descricao;
        this.solucionado = false;
        this.dataInicio = new Date();
    }
}
