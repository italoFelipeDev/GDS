export class Impedimento{

    id: number;
    idParticipante: number;
    idProjeto: string;
    titulo: string;
    nomeUsuario: string;
    descricao: string;
    solucionado: boolean;
    dataInicio: Date;
    dataFim: Date;

    constructor(){
        this.solucionado = false;
        this.dataInicio = new Date();
    }
}
