import { Router } from "@angular/router";

export class RotaUtils{
    private static readonly ROTA_SINGIN = "/singin";
    private static readonly ROTA_LOGIN = "";
    private static readonly ROTA_HOME = "/home";
    private static readonly ROTA_CADASTRO_PROJETO = "/cadastro/projeto";
    private static readonly ROTA_PROJETO_VIEW = "projeto";
    private static readonly ROTA_PROJETO_DAILY = "daily";

    static rotaSingin(): string[]{
        return [`${this.ROTA_SINGIN}`];
    }

    static rotaLogin(): string[]{
        return [`${this.ROTA_LOGIN}`];
    }

    static rotaHome(): string[]{
        return [`${this.ROTA_HOME}`];
    }

    static rotaCadastroProjeto(): string[]{
        return [`${this.ROTA_CADASTRO_PROJETO}`];
    }

    static rotaProjeto(projetoId: string): string[]{
        return [`${this.ROTA_PROJETO_VIEW}/${projetoId}`];
    }

    static rotaProjetoDaily(projetoId: string): string[]{ 
        return [`${this.ROTA_PROJETO_VIEW}/${projetoId}/${this.ROTA_PROJETO_DAILY}`];
    }
}