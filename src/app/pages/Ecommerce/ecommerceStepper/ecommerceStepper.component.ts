import { ChangeDetectorRef, Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { EcommerceCartComponent } from "../ecommerceCart/ecommerceCart.component";
import { ICarrito } from '../card/card.component';
import { CarritoService } from '../../../services/carrito.service';
import { MatStepper } from '@angular/material/stepper';
import { ICliente } from '../../../interfaces/cliente.interface';
import { EcommercePaymentComponent } from "../ecommercePayment/ecommercePayment.component";
import { Pay } from '../../../interfaces/pagos.interface';
import { PedidosService } from '../../../services/pedidos.service';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

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
    EcommercePaymentComponent,
    LayoutModule
  ],
  templateUrl: './ecommerceStepper.component.html',
  styleUrl: './ecommerceStepper.component.css',
})

export class EcommerceStepperComponent implements OnInit {
  carritoService = inject(CarritoService);
  pedidosService = inject(PedidosService);
  ref = inject(ChangeDetectorRef);
  total: number = 0;
  destroyed = new Subject<void>();
  orientationStepper: StepperOrientation = 'horizontal'

  @ViewChild('stepper') private stepper!: MatStepper;

  constructor() {
    inject(BreakpointObserver)
      .observe([Breakpoints.Large])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        if (!result.matches) {
          this.orientationStepper = 'vertical';
        }
      });
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

  getTotalOrders(total: number) {
    this.total = total;
  }

  completeOrder(pay: Pay) {
    const cliente: ICliente = JSON.parse(localStorage.getItem('clientToken') as string);

    const paymentForm = {
      clientId: cliente.id,
      total: this.total,
      payment: pay,
    }

    this.pedidosService.postPedidosAPI(paymentForm);
    this.stepper.next();
    this.carritoService.setCarrito.set([]);
  }
}
