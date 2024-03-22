import { Component, Input } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-card-mini-usuario',
  templateUrl: './card-mini-usuario.component.html',
  styleUrls: ['./card-mini-usuario.component.scss']
})
export class CardTestimonyComponent {
  @Input({ required: true }) usuario!: Partial<IUsuario>;
}
