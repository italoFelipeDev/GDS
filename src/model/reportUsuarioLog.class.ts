import { Usuario } from "./usuario.class";

export class ReportUsuarioLog {

    usuarioId: string;
    tempoDecorrido: number;

    constructor(usuario: string, tempoDecorrido : number){
        this.usuarioId = usuario;
        this.tempoDecorrido = tempoDecorrido;
    }
}