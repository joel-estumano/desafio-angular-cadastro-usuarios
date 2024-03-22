export interface IUsuario {
    _id: string;
    nome: string;
    sobreNome: string;
    telefone: {
        codigoDoPais: string;
        numero: string;
    };
    email: string;
    perfis: string[];
    idioma: string;
    contatoPreferencial: 'email' | 'telefone' | 'todos';

    status: 'ativo' | 'pendente' | 'bloqueado';
    criadoEm: string;
    ultimoAcesso: string;

    cor: string;
}
