import { ChangeDetectorRef, Component, effect, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { IProductoTest } from '../../../interfaces/producto.interface';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';
import { ICliente } from '../../../interfaces/cliente.interface';
import { ICarritoAPI } from '../../../interfaces/carrito.interface';

type ActionButton = 'plus' | 'remove';

@Component({
  selector: 'app-ecommerce-cart',
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonModule,
    CurrencyPipe
  ],
  templateUrl: './ecommerceCart.component.html',
  styleUrl: './ecommerceCart.component.css',
})


export class EcommerceCartComponent implements OnInit {
  carritoService = inject(CarritoService);
  ref = inject(ChangeDetectorRef);


  @Output() returnTotal = new EventEmitter<number>();

  products: ICarritoAPI[] = [];

  constructor() {
    effect(() => {
      this.products = this.carritoService.getCarritoApi();
      const total = this.products.map(pro =>
        pro.amount * pro.producto.store.price
      ).reduce((valorAnterior, valorActual) => {
        return valorAnterior + valorActual;
      }, 0)

      this.returnTotal.emit(total);
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    const cliente: ICliente = JSON.parse(localStorage.getItem('clientToken') as string);
    this.carritoService.getCarritoAPI(cliente.id.toString());
  }

  changeAmountProduct(product: ICarritoAPI, action: ActionButton) {
    const findProduct = this.products.find(pro => pro.id === product.id);
    const cliente: ICliente = JSON.parse(localStorage.getItem('clientToken') as string);

    if (findProduct) {
      if (action === 'plus') {
        findProduct.amount += 1;
      }
      if (action === 'remove' && findProduct.amount !== 1) {
        findProduct.amount -= 1;
      }

      const bodyCarrito = {
        id: findProduct.id,
        amount: findProduct.amount,
      }

      this.carritoService.putCarritosAPI(bodyCarrito, cliente.id.toString())

      const total = this.products.map(pro =>
        pro.amount * pro.producto.store.price
      ).reduce((valorAnterior, valorActual) => {
        return valorAnterior + valorActual;
      }, 0)

      this.returnTotal.emit(total);
    }
  }

  deleteCarrito(product: ICarritoAPI) {
    const cliente: ICliente = JSON.parse(localStorage.getItem('clientToken') as string);
    this.carritoService.deleteCarritosAPI(product.id, cliente.id.toString());
  }
}


