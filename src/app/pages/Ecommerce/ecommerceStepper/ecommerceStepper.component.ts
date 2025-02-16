import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { EcommerceCartComponent } from "../ecommerceCart/ecommerceCart.component";
import { ICarrito } from '../card/card.component';
import { CarritoService } from '../../../services/carrito.service';
import { ClienteService } from '../../../services/clients.service';
import { AuthService } from '../../../services/auth.service';
import { ICliente } from '../../../interfaces/cliente.interface';
import { EcommercePaymentComponent } from "../ecommercePayment/ecommercePayment.component";

@Component({
  selector: 'app-ecommerce-stepper',
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    EcommerceCartComponent,
    EcommercePaymentComponent
],
  templateUrl: './ecommerceStepper.component.html',
  styleUrl: './ecommerceStepper.component.css',
})

export class EcommerceStepperComponent implements OnInit {
  carritoService = inject(CarritoService);
  ref = inject(ChangeDetectorRef);

  constructor() {

  }

  ngOnInit(): void {
    const getCarritoLocal: ICarrito[] = JSON.parse(localStorage.getItem('carrito') as string);
    const cliente: ICliente = JSON.parse(localStorage.getItem('clientToken') as string);

    if (getCarritoLocal && getCarritoLocal.length > 0 && cliente.id !== null) {
      getCarritoLocal.map(pro => {
        const bodyCarrito = {
          clientId: cliente.id,
          productId: pro.id,
          amount: pro.amount,
        }
        this.carritoService.postCarritosAPI(bodyCarrito, cliente.id.toString() as string)
      })

      localStorage.removeItem('carrito');
    }
  }
}
