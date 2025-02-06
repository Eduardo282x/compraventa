import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IInventario } from '../../../interfaces/producto.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [MatButtonModule, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent { 
  @Input() product: IInventario = {} as IInventario;
}
