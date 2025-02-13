import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IInventario } from '../../../interfaces/producto.interface';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';

export interface ICarrito {
  id: number;
  amount: number;
}

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
    const getCarritoLocal: ICarrito[] = JSON.parse(localStorage.getItem('carrito') as string);

    if(!getCarritoLocal){
      localStorage.setItem('carrito', JSON.stringify([{id: product.prodId, amount: 1}]))
    }

    const addProductCarrito: ICarrito[] = [...getCarritoLocal];
    const findProduc = addProductCarrito.find(pro => pro.id === product.prodId);
    
    if(findProduc){
      findProduc.amount += 1;
    } else {
      addProductCarrito.push({id: product.prodId, amount: 1});
    }

    localStorage.setItem('carrito', JSON.stringify(addProductCarrito))
    this.carritoService.setCarrito.set(addProductCarrito);

  }
}
