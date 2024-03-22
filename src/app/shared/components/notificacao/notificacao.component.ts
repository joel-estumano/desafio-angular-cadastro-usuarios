import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificacaoModel } from 'src/app/models/notificacao.model';
import { NotificacaoService } from 'src/app/services/notificacao.service';

@Component({
    template: '',
})
export abstract class Notificacao {
    @Input() timestamp!: Date;
}

@Component({
    selector: 'app-notificacao',
    templateUrl: './notificacao.component.html',
    styleUrls: ['./notificacao.component.scss'],
})
export class NotificacaoComponent {
    protected notificacoes$!: Observable<NotificacaoModel[]>;

    constructor(private notificacaoService: NotificacaoService) {
        this.notificacoes$ = this.notificacaoService.changes().pipe();
    }

    trackById(index: number, n: NotificacaoModel) {
        return n.timestamp;
    }

    remove(timestamp: Date): void {
        this.notificacaoService.remove(timestamp);
    }
}
