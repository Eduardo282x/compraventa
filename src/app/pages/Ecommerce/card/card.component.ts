import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IInventario } from '../../../interfaces/producto.interface';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-card',
  imports: [MatButtonModule, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent { 
  @Input() product: IInventario = {} as IInventario;
  carritoService = inject(CarritoService);

  addCarrito(product: IInventario) {
    const getCarritoLocal: number[] = JSON.parse(localStorage.getItem('carrito') as string);

    if(!getCarritoLocal){
      localStorage.setItem('carrito', JSON.stringify([product.prodId]))
    }

    const addProductCarrito: number[] = [...getCarritoLocal]
    addProductCarrito.push(product.prodId);

    localStorage.setItem('carrito', JSON.stringify(addProductCarrito))
    this.carritoService.setCarrito.set(addProductCarrito);

  }
}
