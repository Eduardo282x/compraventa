import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
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

  products: ICarritoAPI[] = [];

  constructor() {
    effect(() => {
      this.products = this.carritoService.getCarritoApi();
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    const cliente: ICliente = JSON.parse(localStorage.getItem('clientToken') as string);
    this.carritoService.getCarritoAPI(cliente.id.toString());
  }

  changeAmountProduct(product: ICarritoAPI, action: ActionButton) {
    const findProduct = this.products.find(pro => pro.id === product.id);

    if (findProduct) {
      if (action === 'plus') {
        findProduct.cant += 1
      }
      if (action === 'remove' && findProduct.cant !== 1) {
        findProduct.cant -= 1
      }
    }

  }
}


