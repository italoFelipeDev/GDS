export default class UsuarioLogadoNaoEcontradoException extends Error {

    public static readonly MENSAGEM_ERRO: string = "Erro ao recupar usuario logado.";
  
    constructor() {
        super("Erro ao recupar usuario logado.");

        Object.setPrototypeOf(this, UsuarioLogadoNaoEcontradoException.prototype);
    }

  }
  