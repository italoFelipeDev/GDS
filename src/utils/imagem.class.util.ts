export class ImagemUtil {

    tratarImagem(evento: Event){

        let imagemSource: string = '';
        const target = evento.target as HTMLInputElement;

        const arquivos = target.files as FileList;

        const arquivo = arquivos[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            imagemSource = reader.result as string;
        };
        reader.readAsDataURL(arquivo);
        
    }
}