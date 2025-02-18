import { Component, effect, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IInventario, Moneda } from '../../../interfaces/producto.interface';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';
import { ICliente } from '../../../interfaces/cliente.interface';
import { InventarioService } from '../../../services/inventario.service';

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
export class CardComponent implements OnInit {
  @Input() product: IInventario = {} as IInventario;
  carritoService = inject(CarritoService);
  inventarioService = inject(InventarioService);
  currencyLocal: string = 'USD';

  constructor() {
    effect(() => {
      const currencyId = localStorage.getItem('currencyId');
      const changeCurrency = currencyId ? currencyId : this.inventarioService.getCurrency();
      const currencySelected = this.inventarioService.getMoneda().find(cu => cu.id === Number(changeCurrency));
      if (currencySelected) {
        this.currencyLocal = currencySelected.symbol;
      }
    })
  }

  ngOnInit(): void {
    const currencyId = localStorage.getItem('currencyId');

    const currencySelected = this.inventarioService.getMoneda().find(cu => cu.id === Number(currencyId));
    if (currencySelected) {
      this.currencyLocal = currencySelected.symbol;
    }

  }

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
