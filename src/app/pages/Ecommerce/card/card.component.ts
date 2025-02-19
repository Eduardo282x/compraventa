import { Component, effect, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IInventario } from '../../../interfaces/producto.interface';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';
import { ICliente } from '../../../interfaces/cliente.interface';
import { InventarioService } from '../../../services/inventario.service';

export interface ICarrito {
  id: number;
  amount: number;
}

const backendUrl = 'http://localhost:3000/uploads'; // URL base del backend


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
      const changeCurrency = this.inventarioService.getCurrency();
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

  getImageUrl2(image: string){
    return getImageUrl(image)
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

  async returnPriceConvert(product: IInventario): Promise<number> {
    let precio = parseFloat(product.store.price.toString());

    // if (product.store.Moneda.symbol !== this.currencyLocal) {
    //   let tasaCambio = await this.obtenerTasaCambio(product.store.Moneda.symbol, this.currencyLocal);
    //   let precioConvertido = (precio * tasaCambio).toFixed(2);
    //   return Number(precioConvertido);
    // } else {
    //   return product.store.price;
    // }

    return product.store.price;
  }

  async obtenerTasaCambio(from: string, to: string) {
    try {
      let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      let data = await response.json();
      return data.rates[to] || 1;
    } catch (error) {
      console.error("Error obteniendo la tasa de cambio:", error);
      return 1; // Retorna 1 en caso de error para evitar fallos en la conversión
    }
  }
}

export const getImageUrl = (imgPath: string): string => {
  return imgPath ? `${backendUrl}/${imgPath}` : 'assets/default-image.jpg';
}
