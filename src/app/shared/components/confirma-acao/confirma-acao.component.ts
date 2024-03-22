import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IUsuario } from 'src/app/interfaces/usuario.interface';

@Component({
    selector: 'app-confirma-acao',
    templateUrl: './confirma-acao.component.html',
    styleUrls: ['./confirma-acao.component.scss'],
})
export class ConfirmaAcaoComponent {
    @Input({ required: true }) data!: IUsuario;
    @Input({ required: true }) acao: 'update' | 'delete' = 'update';
    constructor(private ngbActiveModal: NgbActiveModal) { }

    confirmar(usuario: IUsuario) {
        this.ngbActiveModal.close(usuario);
    }

    dismiss() {
        this.ngbActiveModal.dismiss();
    }
}
