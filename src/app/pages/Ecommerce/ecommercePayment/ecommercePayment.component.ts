import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { PagosService } from '../../../services/pagos.service';
import { IMethodPayment } from '../../../interfaces/pagos.interface';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ecommerce-payment',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule],
  templateUrl: './ecommercePayment.component.html',
  styleUrl: './ecommercePayment.component.css',
})
export class EcommercePaymentComponent implements OnInit {

  pagosService = inject(PagosService);
  ref = inject(ChangeDetectorRef);
  methodPayments: IMethodPayment[] = [];
  methodPaymentSelected: IMethodPayment = {} as IMethodPayment;

  constructor() {
    effect(() => {
      this.methodPayments = this.pagosService.getMetodosPagos();
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.pagosService.getMetodosPagosAPI();
  }

  selectMethodPayment(methodId: number) {
    const findMethod = this.methodPayments.find(me => me.id === Number(methodId));
    if (findMethod) {
      this.methodPaymentSelected = findMethod;
    }
  }
}
