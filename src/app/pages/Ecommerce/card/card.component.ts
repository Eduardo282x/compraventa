import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IInventario } from '../../../interfaces/producto.interface';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';
import { ICliente } from '../../../interfaces/cliente.interface';

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

  saveCarrito(product: IInventario) {
    const clientLoged = localStorage.getItem('clientToken');

    if (clientLoged) {
      this.addCarritoCliente(product);
    } else {
      this.addCarrito(product);
    }
  }

  addCarrito(product: IInventario) {
    const getCarritoLocal: ICarrito[] = JSON.parse(localStorage.getItem('carrito') as string);

    if (!getCarritoLocal) {
      localStorage.setItem('carrito', JSON.stringify([{ id: product.id, amount: 1 }]))
    }

    const addProductCarrito: ICarrito[] = [...getCarritoLocal];
    const findProduc = addProductCarrito.find(pro => pro.id === product.id);

    if (findProduc) {
      findProduc.amount += 1;
    } else {
      addProductCarrito.push({ id: product.id, amount: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(addProductCarrito))
    this.carritoService.setCarrito.set(addProductCarrito);
  }

  addCarritoCliente(product: IInventario) {
    const cliente: ICliente = JSON.parse(localStorage.getItem('clientToken') as string);

    const bodyCarrito = {
      clientId: cliente.id,
      productId: product.id,
      amount: 1,
    }

    this.carritoService.postCarritosAPI(bodyCarrito, cliente.id.toString())
  }
}
