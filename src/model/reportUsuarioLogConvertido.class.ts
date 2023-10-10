import { Usuario } from "./usuario.class";

export class ReportUsuarioLogConvertido {

    usuario: Usuario;
    tempoDecorrido: number;

    constructor(usuario: Usuario, tempoDecorrido : number){
        this.usuario = usuario;
        this.tempoDecorrido = tempoDecorrido;
    }
}