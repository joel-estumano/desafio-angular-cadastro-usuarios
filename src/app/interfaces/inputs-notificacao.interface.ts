import { IUsuario } from "./usuario.interface";

export interface IInputsNotificacao {
    tipo: 'sucesso' | 'fracasso';
    titulo: string;
    message: string;
    data: IUsuario | any;
}
