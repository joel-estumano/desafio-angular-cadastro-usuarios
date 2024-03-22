import { Component, Input, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { CustomValidators } from 'src/app/form-validators/custom.validator';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { FormService } from 'src/app/services/form.service';
import { UtilPaisIdioma } from 'src/app/sources/pais-idioma.util';
import { UtilPaisCodeTelefone } from 'src/app/sources/pais-code-telefone';
import { DataService } from 'src/app/services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
    NgbActiveModal,
    NgbModal,
    NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/utils/utils';
import { ConfirmaAcaoComponent } from '../confirma-acao/confirma-acao.component';
import { NotificacaoModel } from 'src/app/models/notificacao.model';
import { IInputsNotificacao } from 'src/app/interfaces/inputs-notificacao.interface';
import { AlertaComponent } from '../notificacao/alerta/alerta.component';
import { NotificacaoService } from 'src/app/services/notificacao.service';

@Component({
    selector: 'app-form-usuario',
    templateUrl: './form-usuario.component.html',
    styleUrls: ['./form-usuario.component.scss'],
})
export class FormUsuarioComponent implements OnInit {
    @Input({ required: true }) data!: IUsuario;

    form!: FormGroup;
    utilPaisIdioma = UtilPaisIdioma;
    utilPaisCodeTelefone = UtilPaisCodeTelefone;
    perfis = [
        { id: 'analista', label: 'Analista' },
        { id: 'supervisor', label: 'Supervisor' },
    ];

    constructor(
        private fb: FormBuilder,
        protected formService: FormService,
        private dataService: DataService,
        private modalService: NgbModal,
        private ngbActiveModal: NgbActiveModal,
        private notificacaoService: NotificacaoService
    ) {
        this.form = this.fb.group({
            nome: new FormControl(null, [
                Validators.required,
                CustomValidators.notEmpty,
            ]),
            sobreNome: new FormControl(null, [
                Validators.required,
                CustomValidators.notEmpty,
            ]),
            telefone: this.fb.group({
                codigoDoPais: new FormControl(this.utilPaisCodeTelefone[30].ddi, []),
                numero: new FormControl(null, []),
            }),
            email: new FormControl(null, [
                Validators.required,
                CustomValidators.notEmpty,
                Validators.email,
            ]),
            perfis: new FormControl(null, [Validators.required]),
            idioma: new FormControl(this.utilPaisIdioma[157].id, [
                Validators.required,
                CustomValidators.notEmpty,
            ]),
            contatoPreferencial: new FormControl('todos', []),
        });
    }

    ngOnInit(): void {
        if (this.data) {
            this.form.patchValue(this.data, { emitEvent: false, onlySelf: true });
        }
    }

    get formTelefone(): FormGroup {
        return this.form.controls['telefone'] as FormGroup;
    }

    dropdownChange(event: any) {
        this.formTelefone.patchValue({ codigoDoPais: event.target.id });
    }

    onSubmit() {
        if (this.formService.valid(this.form)) {
            const now = new Date();
            if (!this.data) {
                const usuario: IUsuario = Object.assign(
                    {
                        _id: now.toISOString(),
                        status: 'ativo',
                        criadoEm: now.toISOString(),
                        ultimoAcesso: now.toISOString(),
                        cor: Utils.roundColor(),
                    } as IUsuario,
                    this.form.value
                );
                this.dataService.add(usuario).subscribe({
                    next: (response: any) => {
                        this.gerarNotificacao(response.message, response.data);
                        this.ngbActiveModal.close(response);
                    },
                    error: (erro: HttpErrorResponse) => {
                        this.gerarNotificacao(erro.message, erro.error.data, false);
                        this.ngbActiveModal.close();
                        console.log(erro);
                    },
                    complete: () => { },
                });
            } else {
                const modalRef: NgbModalRef = this.modalService.open(
                    ConfirmaAcaoComponent,
                    {
                        ariaLabelledBy: 'modal-basic-title',
                        size: 'md',
                        centered: true,
                        backdrop: 'static',
                    }
                );
                modalRef.componentInstance.data = this.data;
                modalRef.result.then(
                    (result) => {
                        if (result) {
                            const usuario: IUsuario = Object.assign(
                                this.data,
                                this.form.value
                            );
                            this.dataService.edit(usuario).subscribe({
                                next: (response: any) => {
                                    this.gerarNotificacao(response.message, response.data);
                                    this.ngbActiveModal.close(response);
                                },
                                error: (erro: HttpErrorResponse) => {
                                    this.gerarNotificacao(erro.message, erro.error.data, false);
                                    this.ngbActiveModal.close();
                                    console.log(erro);
                                },
                                complete: () => { },
                            });
                        }
                    },
                    (reason) => { }
                );
            }
        } else {
            console.error(`from: ${this.form.status}`);
        }
    }

    dismiss() {
        this.ngbActiveModal.dismiss();
    }

    gerarNotificacao(message: string, data: IUsuario, sucesso: boolean = true) {
        this.notificacaoService.add(
            new NotificacaoModel({
                component: AlertaComponent,
                inputs: {
                    data: {
                        tipo: sucesso ? 'sucesso' : 'fracasso',
                        titulo: sucesso ? 'Sucesso!' : 'Fracasso!',
                        message: message,
                        data: data
                    } as IInputsNotificacao,
                },
            })
        );
    }
}
