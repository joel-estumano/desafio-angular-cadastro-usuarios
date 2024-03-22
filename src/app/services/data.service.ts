import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/usuario.interface';
import { dataSources } from '../sources/data-sources';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    usuarios: IUsuario[] = dataSources;

    constructor() { }

    add(usuario: IUsuario): Observable<any> {
        return new Observable((obs) => {
            try {
                this.usuarios.unshift(usuario);
                obs.next({
                    message: 'Salvo com sucesso!',
                    data: usuario,
                });
            } catch {
                obs.error({
                    message: 'Erro em salvar!',
                    error: { data: usuario },
                });
            }
        });
    }

    get(_id: string) {
        return this.usuarios.find((u) => u._id === _id);
    }

    edit(usuario: IUsuario): Observable<any> {
        return new Observable((obs) => {
            try {
                this.usuarios = this.usuarios.map((u) => {
                    if (u._id === usuario._id) {
                        u = {
                            ...u,
                            ...usuario,
                        };
                    }
                    return u;
                });
                obs.next({
                    message: 'Sucesso em editar!',
                    data: usuario,
                });
            } catch {
                obs.error({
                    message: 'Erro em editar!',
                    error: { data: usuario },
                });
            }
        });
    }

    remove(_id: string): Observable<any> {
        return new Observable((obs) => {
            const data = this.get(_id);
            try {
                this.usuarios = this.usuarios.filter((u) => u._id !== _id);
                obs.next({
                    message: 'Removido com sucesso!',
                    data: data
                });
            } catch {
                obs.error({
                    message: 'Erro em remover!',
                    error: { data: data },
                });
            }
        });
    }

    list(search: any): Observable<any> {
        return new Observable((obs) => {
            try {
                obs.next(this.usuarios);
            } catch {
                obs.error({
                    message: 'Erro!',
                });
            }
        });
    }
}
