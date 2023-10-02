import UsuarioLogadoNaoEcontradoException from "src/exception/usuarioLogado.error.class";
import { Usuario } from "src/model/usuario.class";

export class LocalStorageUtil {

    private static readonly LOCATION_USUARIO_LOGADO = "usuarioLogado";

    static salvarUsuarioLogado(usuario: Usuario) {
        window.localStorage.setItem(LocalStorageUtil.LOCATION_USUARIO_LOGADO, JSON.stringify(usuario));
    }

    static recuperarUsuarioLogado(): Usuario {
        try {
            let usuarioLogado: Usuario = JSON.parse(LocalStorageUtil.recuperarStringUsuarioLogado());
            return usuarioLogado;
        } catch (e) {
            console.log('Houve algum erro ao recupar usuario logado: ', e);
            throw new UsuarioLogadoNaoEcontradoException();
        }
    }

    private static recuperarStringUsuarioLogado(): string {
        return window.localStorage.getItem(LocalStorageUtil.LOCATION_USUARIO_LOGADO) ? <string>window.localStorage.getItem(LocalStorageUtil.LOCATION_USUARIO_LOGADO) : '';
    }

    static removerUsuarioLogado(): void {
        if (window.localStorage.getItem(LocalStorageUtil.LOCATION_USUARIO_LOGADO)) {
            window.localStorage.removeItem(LocalStorageUtil.LOCATION_USUARIO_LOGADO);
        }
    }
}