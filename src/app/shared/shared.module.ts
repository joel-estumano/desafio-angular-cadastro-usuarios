import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { CardTestimonyComponent } from './components/card-mini-usuario/card-mini-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfirmaAcaoComponent } from './components/confirma-acao/confirma-acao.component';
import { NavPaginacaoComponent } from './components/nav-paginacao/nav-paginacao.component';
import { DinamicaImgBackgroundDirective } from './directives/dinamica-img-background.directive';
import { NotificacaoComponent } from './components/notificacao/notificacao.component';
import { AlertaComponent } from './components/notificacao/alerta/alerta.component';
import { NadaPorAquiComponent } from './components/nada-por-aqui/nada-por-aqui.component';

@NgModule({
  declarations: [
    FormUsuarioComponent,
    CardTestimonyComponent,
    ConfirmaAcaoComponent,
    NavPaginacaoComponent,
    DinamicaImgBackgroundDirective,
    NotificacaoComponent,
    AlertaComponent,
    NadaPorAquiComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgSelectModule,
  ],
  exports: [
    CardTestimonyComponent,
    NavPaginacaoComponent,
    DinamicaImgBackgroundDirective,
    NgSelectModule,
    NotificacaoComponent,
    NadaPorAquiComponent
  ],
  providers: [provideNgxMask()],
})
export class SharedModule {}
