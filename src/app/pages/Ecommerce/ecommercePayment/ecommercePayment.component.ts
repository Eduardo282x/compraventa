import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { PagosService } from '../../../services/pagos.service';
import { IMethodPayment, Pay } from '../../../interfaces/pagos.interface';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ecommerce-payment',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule],
  templateUrl: './ecommercePayment.component.html',
  styleUrl: './ecommercePayment.component.css',
})
export class EcommercePaymentComponent implements OnInit {
  @Input() total: number = 0;
  @Output() paymentForm = new EventEmitter<Pay>();

  pagosService = inject(PagosService);
  ref = inject(ChangeDetectorRef);
  methodPayments: IMethodPayment[] = [];
  formMethod: FormGroup = new FormGroup({
    id: new FormControl(0),
    currencyId: new FormControl(0),
    owner: new FormControl(''),
    bank: new FormControl(''),
    identify: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    type: new FormControl(''),
  })

  formPayment: FormGroup = new FormGroup({
    namePayer: new FormControl('', [Validators.required]),
    lastNamePayer: new FormControl('', [Validators.required]),
    identifyPayer: new FormControl('', [Validators.required]),
    phonePayer: new FormControl('', [Validators.required]),
    emailPayer: new FormControl('', [Validators.required]),
    bankPayer: new FormControl('', [Validators.required]),
    reference: new FormControl('', [Validators.required]),
  })

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
      this.formMethod.setValue(findMethod);
      this.formMethod.disable()
    }
  }

  completePayment() {
    const payment: Pay = {
      methodPaymentId: this.formMethod.controls['id'].value,
      ...this.formPayment.value
    }
    this.paymentForm.emit(payment)
  }
}
