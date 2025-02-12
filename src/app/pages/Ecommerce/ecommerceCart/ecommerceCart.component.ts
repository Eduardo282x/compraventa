import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { IProductoTest } from '../../../interfaces/producto.interface';
import { CurrencyPipe } from '@angular/common';

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


export class EcommerceCartComponent {

  products: IProductoTest[] = [
    {
      id: 1,
      title: 'Pepsi 1.5L',
      category: 'Bebida',
      price: 1,
      amount: 1
    },
    {
      id: 2,
      title: 'Coca Cola 1.5L',
      category: 'Bebida',
      price: 1,
      amount: 2
    },
    {
      id: 3,
      title: 'Arroz 500g',
      category: 'Alimento',
      price: 3,
      amount: 1
    },
    {
      id: 4,
      title: 'Pasta 1kg',
      category: 'Alimento',
      price: 4,
      amount: 1
    },
  ]

  changeAmountProduct(product: IProductoTest, action: ActionButton) {
    const findProduct = this.products.find(pro => pro.id === product.id);

    if(findProduct){
      if(action === 'plus'){
        findProduct.amount += 1
      }
      if(action === 'remove' && findProduct.amount !== 0){
        findProduct.amount -= 1
      }
    }

  }
}


